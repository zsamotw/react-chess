import { List } from "immutable";
import Field from "./Field";

type Row = List<Field>

export default interface Store {
  gameId: string | null;
	board: any | List<Row>
}