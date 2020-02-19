import { List } from 'immutable'
import { Field } from './field-model'
import Color from './color'
import FetchingData from './fetching-data'
import Message from './message'
import Move from './move-model'

type Row = List<Field>

export default interface GameState {
  gameId: string | null
  board: List<Row>
  isGameOver: boolean
  activePlayerColor: Color
  fetchingData: FetchingData
  currentMoveStartingPoint: string | null
  message: Message
  moves: List<Move>
}
