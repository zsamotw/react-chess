import { List } from "immutable";
import Field from "./field-model";

type Row = List<Field>

export default interface Store {
  gameId: string | null;
	board: any | List<Row>
}