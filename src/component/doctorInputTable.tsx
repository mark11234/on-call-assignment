import { Doctor } from "../models/doctor";
import "./doctorInput.css";
import { Checkbox, MenuItem, Select, TextField } from "@mui/material";

type DoctorInputTableProps = {
  doctors: Doctor[];
  setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;
};

const DoctorInputTable: React.FC<DoctorInputTableProps> = ({
  doctors,
  setDoctors,
}) => {
  //   const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const updateDoctorIndex = (
    doctorValueToUpdate: Doctor,
    doctorToDisplayIndex: number,
  ) =>
    setDoctors(
      doctors.map((doctorToSet, doctorToSetIndex) =>
        doctorToSetIndex === doctorToDisplayIndex
          ? doctorValueToUpdate
          : doctorToSet,
      ),
    );
  return (
    <>
      <div className="row">
        <div className="cell">Name</div>
        <div className="cell">Number of Firsts</div>
        <div className="cell">Number of Seconds</div>
        <div className="cell">After Holiday?</div>
        <div className="cell">Allow 1s then 2s?</div>
        <div className="cell">Holidays</div>
      </div>
      {doctors.map((doctor, index) => (
        <div className="row">
          <div className="cell">
            <TextField
              variant="standard"
              value={doctor.name}
              onChange={(e) =>
                updateDoctorIndex({ ...doctor, name: e.target.value }, index)
              }
            ></TextField>
          </div>
          <div className="cell">
            <Select
              value={doctor.numberOfFirsts}
              onChange={(e) =>
                updateDoctorIndex(
                  {
                    ...doctor,
                    numberOfFirsts:
                      typeof e.target.value === "number"
                        ? e.target.value
                        : parseInt(e.target.value),
                  },
                  index,
                )
              }
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </div>

          <div className="cell">
            <Select
              value={doctor.numberOfSeconds}
              onChange={(e) =>
                updateDoctorIndex(
                  {
                    ...doctor,
                    numberOfSeconds:
                      typeof e.target.value === "number"
                        ? e.target.value
                        : parseInt(e.target.value),
                  },
                  index,
                )
              }
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </div>
          <div className="cell">
            <Checkbox
              checked={doctor.allowAfterHoliday}
              onChange={(e) =>
                updateDoctorIndex(
                  { ...doctor, allowAfterHoliday: !!e.target.checked },
                  index,
                )
              }
            />
          </div>
          <div className="cell">
            <Checkbox
              checked={doctor.allowConsecutives}
              onChange={(e) =>
                updateDoctorIndex(
                  { ...doctor, allowConsecutives: !!e.target.checked },
                  index,
                )
              }
            />
          </div>
          <div className="cell">
            <p>{doctor.holidays.toString()}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default DoctorInputTable;
