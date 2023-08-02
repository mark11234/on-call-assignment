import { Doctor } from "../models/doctor";
import * as _ from "lodash";

const MILLISECONDS_IN_WEEK = 604800000;
const BreakError = {};
type RotaItem = {
  date: Date;
  firstOn: Doctor;
  secondOn: Doctor;
};
type RotaError = "BAD_DATE_RANGE" | "INSUFFICIENT_ON_CALL_PROVIDED";

export const getNewRota = (
  inputDoctors: Doctor[],
  startDate: Date,
  endDate: Date,
): RotaItem[] | RotaError => {
  const doctors = Array.from(inputDoctors).map((doctor) => ({
    ...doctor,
    holidays: _.uniq(doctor.holidays.map((date) => getPreviousMonday(date))),
  }));
  if (startDate >= endDate) return "BAD_DATE_RANGE";

  const mondays: Date[] = getListOfMondays(startDate, endDate);

  if (
    doctors.reduce(
      (totalOnCalls, currentDoctor) =>
        totalOnCalls + currentDoctor.numberOfFirsts,
      0,
    ) < mondays.length ||
    doctors.reduce(
      (totalOnCalls, currentDoctor) =>
        totalOnCalls + currentDoctor.numberOfSeconds,
      0,
    ) < mondays.length
  ) {
    return "INSUFFICIENT_ON_CALL_PROVIDED";
  }
  for (let i = 0; i <= 1000; i++) {
    let badRota = false;
    const rotaAttempt: RotaItem[] = [];
    try {
      mondays.forEach((date) => {
        const availableFirstDoctors = doctors
          .filter(
            (doctor) =>
              !doctor.holidays.find(
                (holiday) => holiday.valueOf() === date.valueOf(),
              ),
          )
          .filter(
            (doctor) =>
              rotaAttempt.filter((item) => item.firstOn.name === doctor.name)
                .length < doctor.numberOfFirsts,
          );

        const availableSecondDoctors = doctors
          .filter(
            (doctor) =>
              !doctor.holidays.find(
                (holiday) => holiday.valueOf() === date.valueOf(),
              ),
          )
          .filter(
            (doctor) =>
              rotaAttempt.filter((item) => item.secondOn.name === doctor.name)
                .length < doctor.numberOfSeconds,
          );

        if (
          availableFirstDoctors.length === 0 ||
          availableSecondDoctors.length === 0
        ) {
          throw BreakError;
        }

        for (let j = 0; j <= 100; j++) {
          const firstOnAttempt =
            availableFirstDoctors[
              Math.floor(Math.random() * availableFirstDoctors.length)
            ];
          if (
            firstOnAttempt === availableSecondDoctors[0] &&
            availableSecondDoctors.length === 1
          ) {
            break;
          }
          const secondOnAttempt = availableSecondDoctors.filter(
            (doctor) => doctor !== firstOnAttempt,
          )[Math.floor(Math.random() * (availableFirstDoctors.length - 1))];
          if (
            validAdditionToRota(rotaAttempt, {
              date: date,
              firstOn: firstOnAttempt,
              secondOn: secondOnAttempt,
            })
          ) {
            rotaAttempt.push({
              date: date,
              firstOn: firstOnAttempt,
              secondOn: secondOnAttempt,
            });
            break;
          } else {
            if (j >= 99) {
              badRota = true;
              throw BreakError;
            }
          }
        }
      });
    } catch (err) {
      if (err !== BreakError) throw err;
    }
    if (!badRota) return rotaAttempt;
  }

  return mondays.map((date) => ({
    date: date,
    firstOn: doctors[0],
    secondOn: doctors[1],
  }));
};

const getPreviousMonday = (date: Date): Date => {
  const previousMonday = new Date(date.toUTCString());
  previousMonday.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7));
  return previousMonday;
};

const validAdditionToRota = (
  rota: RotaItem[],
  itemToAdd: RotaItem,
): boolean => {
  if (!itemToAdd?.secondOn) {
    // second on sometimes undefined
    // TODO: fix this!
    return false;
  }
  const firstNotOnHoliday = !itemToAdd.firstOn.holidays.find(
    (holiday) => holiday.valueOf() === itemToAdd.date.valueOf(),
  );
  const secondNotOnHoliday = !itemToAdd.secondOn.holidays.find(
    (holiday) => holiday.valueOf() === itemToAdd.date.valueOf(),
  );

  if (rota.length === 0) {
    return firstNotOnHoliday && secondNotOnHoliday;
  }
  return !(
    itemToAdd.firstOn === rota[rota.length - 1].firstOn || //two in a row
    itemToAdd.secondOn === rota[rota.length - 1].secondOn || // two in a row
    (!itemToAdd.firstOn.allowConsecutives &&
      itemToAdd.firstOn === rota[rota.length - 1].secondOn) || // second then first
    (!itemToAdd.secondOn.allowConsecutives &&
      itemToAdd.secondOn === rota[rota.length - 1].firstOn) || // first then second
    (!itemToAdd.firstOn.allowAfterHoliday && // leave then first on call
      itemToAdd.firstOn.holidays.find(
        (holiday) => holiday.valueOf() === rota[rota.length - 1].date.valueOf(),
      )) ||
    (!itemToAdd.secondOn.allowAfterHoliday && // leave then second on call
      itemToAdd.secondOn.holidays.find(
        (holiday) => holiday.valueOf() === rota[rota.length - 1].date.valueOf(),
      )) ||
    !firstNotOnHoliday ||
    !secondNotOnHoliday
  );
};

const getListOfMondays = (startDate: Date, endDate: Date): Date[] => {
  const startMonday = getPreviousMonday(startDate);
  const mondays: Date[] = [];
  let numberOfWeeks = 1;
  while (startMonday <= endDate) {
    const dateToAdd = new Date(
      startMonday.valueOf() + numberOfWeeks * MILLISECONDS_IN_WEEK,
    );
    if (dateToAdd > endDate) break;
    mondays.push(dateToAdd);
    numberOfWeeks = numberOfWeeks + 1;
    if (numberOfWeeks >= 100) break; // Fail safe to prevent crashes
  }
  return mondays;
};
