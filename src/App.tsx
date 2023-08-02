import "./App.css";
import { getNewRota } from "./helpers/getNewRota";
import { doctors } from "./data/initialDoctors";

// TODO: Replace this with useState() hooks
const startDate = new Date();
startDate.setUTCHours(0, 0, 0, 0);
const endDate = new Date();
endDate.setUTCDate(endDate.getDay() + 365);
endDate.setUTCHours(0, 0, 0, 0);
const rotaOutput = getNewRota(doctors, startDate, endDate);

const App = () => {
  return (
    <div className="wrapper">
      <header className="header">
        <p>
          Start Date: {startDate.toUTCString()} <br></br>
          End Date: {endDate.toUTCString()} <br></br>
        </p>
        {rotaOutput.status !== "OK" && rotaOutput.status}
        {rotaOutput.status === "OK" &&
          rotaOutput.rota.map((item, index) => (
            <p key={index}>
              {item.date.toUTCString()} {item.firstOn.name} {item.secondOn.name}
            </p>
          ))}
      </header>
    </div>
  );
};

export default App;
