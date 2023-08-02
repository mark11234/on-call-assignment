import "./App.css";
import { getNewRota } from "./helpers/getNewRota";
import { Doctor } from "./models/doctor";

const holidayTest = new Date();
holidayTest.setDate(holidayTest.getDate() + 6);
holidayTest.setUTCHours(0, 0, 0, 0);

// TODO: refactor this as an initial value in a separate file
const doctors: Doctor[] = [
  {
    name: "Russ",
    numberOfFirsts: 7,
    numberOfSeconds: 7,
    allowConsecutives: true,
    allowAfterHoliday: true,
    holidays: [holidayTest],
  },
  {
    name: "Fordy",
    numberOfFirsts: 7,
    numberOfSeconds: 7,
    allowConsecutives: false,
    allowAfterHoliday: false,
    holidays: [],
  },
  {
    name: "Habib",
    numberOfFirsts: 8,
    numberOfSeconds: 8,
    allowConsecutives: true,
    allowAfterHoliday: false,
    holidays: [],
  },
  {
    name: "Mansoor",
    numberOfFirsts: 8,
    numberOfSeconds: 8,
    allowConsecutives: true,
    allowAfterHoliday: false,
    holidays: [],
  },
  {
    name: "Rachel",
    numberOfFirsts: 7,
    numberOfSeconds: 7,
    allowConsecutives: true,
    allowAfterHoliday: false,
    holidays: [],
  },
  {
    name: "Tom",
    numberOfFirsts: 8,
    numberOfSeconds: 8,
    allowConsecutives: true,
    allowAfterHoliday: false,
    holidays: [],
  },
  {
    name: "Ramla",
    numberOfFirsts: 8,
    numberOfSeconds: 8,
    allowConsecutives: true,
    allowAfterHoliday: false,
    holidays: [],
  },
];
// TODO: Replace this with useState() hooks
const startDate = new Date();
startDate.setUTCHours(0, 0, 0, 0);
const endDate = new Date();
endDate.setUTCDate(endDate.getDay() + 365);
endDate.setUTCHours(0, 0, 0, 0);
const rota = getNewRota(doctors, startDate, endDate);

function App() {
  const badDateRange = rota === "BAD_DATE_RANGE";
  const insufficentOnCallProvided = rota === "INSUFFICIENT_ON_CALL_PROVIDED";
  return (
    <div className="wrapper">
      <header className="header">
        <p>
          Start Date: {startDate.toUTCString()} <br></br>
          End Date: {endDate.toUTCString()} <br></br>
          Number of Weeks: {rota?.length} <br></br>
          Robers holiday: {doctors[0].holidays[0].toUTCString()}
        </p>
        {!badDateRange &&
          !insufficentOnCallProvided &&
          rota.map((item, index) => (
            <p key={index}>
              {item.date.toUTCString()} {item.firstOn.name} {item.secondOn.name}
            </p>
          ))}
      </header>
    </div>
  );
}

export default App;
