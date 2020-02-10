import { List } from 'immutable'
import Field from './field-model'
import Color from './color'
import FetchingData from './fetching-data'

type Row = List<Field>

export default interface GameState {
  gameId: string | null
  board: any | List<Row>
  activePlayer: Color
  fetchingData: FetchingData
  fromCoordinate: string
  message: string
}
