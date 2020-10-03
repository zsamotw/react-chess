import Color from "./color.model";

export default interface Move {
  startingPointCoordinate: string
  endPointCoordinate: string;
  color: Color
}