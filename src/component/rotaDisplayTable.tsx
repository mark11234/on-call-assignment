import { RotaItem } from "../models/rotaOutput";
import "../App.css";
import { Doctor } from "../models/doctor";

type RotaDisplayTableProps = {
  rota: RotaItem[];
  doctors: Doctor[];
};

const RotaDisplayTable: React.FC<RotaDisplayTableProps> = ({
  rota,
  doctors,
}) => {
  return (
    <>
      <div className="row">
        <div className="midCell">Week Beginning</div>
        {doctors.map((doctor) => (
          <div className="midCell">{doctor.name}</div>
        ))}
      </div>
      {rota.map((rotaItem, index) => (
        <div className="row">
          <div className="midCell">{rotaItem.date.toLocaleDateString()}</div>
          {doctors.map((doctor) => (
            <div className="midCell">
              {rotaItem.firstOn.name === doctor.name ? 1 : ""}
              {rotaItem.secondOn.name === doctor.name ? 2 : ""}
            </div>
          ))}
        </div>
      ))}
      <div className="row">
        <div className="midCell">Number of 1s</div>
        {doctors.map((doctor) => (
          <div className="midCell">
            {rota.reduce(
              (accumulator, currentItem) =>
                accumulator +
                (currentItem.firstOn.name === doctor.name ? 1 : 0),
              0,
            )}
          </div>
        ))}
      </div>
      <div className="row">
        <div className="midCell">Number of 2s</div>
        {doctors.map((doctor) => (
          <div className="midCell">
            {rota.reduce(
              (accumulator, currentItem) =>
                accumulator +
                (currentItem.secondOn.name === doctor.name ? 1 : 0),
              0,
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default RotaDisplayTable;
