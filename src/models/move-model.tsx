import Color from "./color";

export default interface Move {
  startingPointCoordinate: string
  endPointCoordinate: string;
  color: Color
}