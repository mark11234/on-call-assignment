import "./App.css";
import { getNewRota } from "./helpers/getNewRota";
import { doctors as initialDoctors } from "./data/initialDoctors";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RotaOutput } from "./models/rotaOutput";
import { Doctor } from "./models/doctor";
import DoctorInputTable from "./component/doctorInputTable";
import RotaDisplayTable from "./component/rotaDisplayTable";
import { Button } from "@mui/material";

const App = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [rotaOutput, setRotaOutput] = useState<RotaOutput | null>(null);
  useEffect(() => setRotaOutput(null), [doctors, startDate, endDate]);
  return (
    <div className="wrapper">
      <header className="header">
        Start date:
        <DatePicker
          wrapperClassName="datePicker"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        End date:
        <DatePicker
          wrapperClassName="datePicker"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
        />
        <DoctorInputTable doctors={doctors} setDoctors={setDoctors} />
        <Button
          className="button"
          variant="contained"
          onClick={() =>
            setDoctors([
              ...doctors,
              {
                key: doctors.reduce(
                  (maxValue, currentDoctor) =>
                    Math.max(maxValue, currentDoctor.key) + 1,
                  -1,
                ),
                name: "",
                numberOfFirsts: 0,
                numberOfSeconds: 0,
                allowAfterHoliday: false,
                allowConsecutives: false,
                holidays: [],
              },
            ])
          }
        >
          Add Doctor
        </Button>
        {startDate && endDate && (
          <Button
            className="button"
            variant="contained"
            onClick={() =>
              setRotaOutput(getNewRota(doctors, startDate, endDate))
            }
          >
            Generate Rota
          </Button>
        )}
        {rotaOutput && rotaOutput.status !== "OK" && rotaOutput.status}
        {rotaOutput && rotaOutput.status === "OK" && (
          <RotaDisplayTable rota={rotaOutput.rota} doctors={doctors} />
        )}
      </header>
    </div>
  );
};

export default App;
