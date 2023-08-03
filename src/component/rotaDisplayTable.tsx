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
        <div className="accentMidCell">Week Beginning</div>
        {doctors.map((doctor) => (
          <div className="accentShortCell">{doctor.name}</div>
        ))}
      </div>
      {rota.map((rotaItem, index) => (
        <div className="row">
          <div className="midCell">{rotaItem.date.toLocaleDateString()}</div>
          {doctors.map((doctor) => (
            <div className="shortCell">
              {rotaItem.firstOn.key === doctor.key ? 1 : ""}
              {rotaItem.secondOn.key === doctor.key ? 2 : ""}
            </div>
          ))}
        </div>
      ))}
      <div className="row">
        <div className="accentMidCell">Total 1s</div>
        {doctors.map((doctor) => (
          <div className="accentShortCell">
            {rota.reduce(
              (accumulator, currentItem) =>
                accumulator + (currentItem.firstOn.key === doctor.key ? 1 : 0),
              0,
            )}
          </div>
        ))}
      </div>
      <div className="row">
        <div className="accentMidCell">Total 2s</div>
        {doctors.map((doctor) => (
          <div className="accentShortCell">
            {rota.reduce(
              (accumulator, currentItem) =>
                accumulator + (currentItem.secondOn.key === doctor.key ? 1 : 0),
              0,
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default RotaDisplayTable;
