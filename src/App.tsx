import "./App.css";
import { getNewRota } from "./helpers/getNewRota";
import { doctors as initialDoctors } from "./data/initialDoctors";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RotaOutput } from "./models/rotaOutput";
import { Doctor } from "./models/doctor";
import DoctorInputTable from "./component/doctorInputTable";

const App = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const rotaOutput: RotaOutput =
    startDate && endDate
      ? getNewRota(doctors, startDate, endDate)
      : { status: "BAD_DATE_RANGE" };
  return (
    <div className="wrapper">
      <header className="header">
        Start date:{" "}
        <DatePicker
          wrapperClassName="datePicker"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        {startDate?.toLocaleDateString()}
        End date:{" "}
        <DatePicker
          wrapperClassName="datePicker"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
        />
        <DoctorInputTable doctors={doctors} setDoctors={setDoctors} />
        {rotaOutput.status !== "OK" && rotaOutput.status}
        {rotaOutput.status === "OK" &&
          rotaOutput.rota.map((item, index) => (
            <p key={index}>
              {item.date.toLocaleDateString()} {item.firstOn.name}{" "}
              {item.secondOn.name}
            </p>
          ))}
      </header>
      {/* Remove this bit: */}
      <p>
        {doctors.map((doctor) => (
          <p>
            {doctor.name} {doctor.numberOfFirsts} {doctor.numberOfSeconds}
            {doctor.allowAfterHoliday.toString()}
            {doctor.allowConsecutives.toString()}
          </p>
        ))}
      </p>
    </div>
  );
};

export default App;
