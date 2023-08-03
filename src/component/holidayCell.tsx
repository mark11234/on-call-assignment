import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

type HolidayCellProps = {
  holidays: Date[];
  updateHolidays: (holidays: Date[]) => void;
};

const HolidayCell: React.FC<HolidayCellProps> = (props) => {
  const [holidays, setHolidays] = useState<(Date | null)[]>(props.holidays);
  useEffect(() => {
    props.updateHolidays(
      holidays
        .filter((date) => date !== null)
        .map((value) => (value === null ? new Date() : value)),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holidays]);
  return (
    <>
      {holidays.map((date, index) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {" "}
          <DatePicker
            wrapperClassName="datePicker"
            selected={date}
            onChange={(date) =>
              setHolidays(
                holidays.map((oldDate, oldIndex) =>
                  index === oldIndex ? date : oldDate,
                ),
              )
            }
          />
          <Button
            variant="contained"
            onClick={() =>
              setHolidays(
                holidays.filter((oldDate, oldIndex) => index !== oldIndex),
              )
            }
          >
            -
          </Button>
        </div>
      ))}
      <Button
        variant="contained"
        onClick={() => setHolidays([...holidays, null])}
      >
        +
      </Button>
    </>
  );
};

export default HolidayCell;
