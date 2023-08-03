import { Doctor } from "./doctor";

export type RotaItem = {
  date: Date;
  firstOn: Doctor;
  secondOn: Doctor;
};
type RotaError =
  | "BAD_DATE_RANGE"
  | "INSUFFICIENT_ON_CALL_PROVIDED"
  | "REQUEST_TIMED_OUT";

export type RotaOutput =
  | { status: RotaError }
  | { status: "OK"; rota: RotaItem[] };
