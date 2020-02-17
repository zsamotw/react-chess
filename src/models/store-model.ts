import { List } from 'immutable'
import { Field } from './field-model'
import Color from './color'
import FetchingData from './fetching-data'
import Message from './message'

type Row = List<Field>

export default interface GameState {
  gameId: string | null
  board: any | List<Row>
  activePlayerColor: Color
  fetchingData: FetchingData
  currentMoveStartingPoint: string | null
  message: Message
  isGameOver: boolean
}
