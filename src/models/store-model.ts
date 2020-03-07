import { List } from 'immutable'
import { Field } from './field-model'
import Color from './color'
import FetchingData from './fetching-data'
import Message from './message'
import Move from './move-model'
import CapturedFigures from './captured-figures'
import GameMode from './game-mode'

type Row = List<Field>

export default interface GameState {
  gameId: string | null,
  gameMode: GameMode,
  board: List<Row>,
  isGameOver: boolean,
  activePlayerColor: Color,
  fetchingData: FetchingData,
  currentMoveStartingPoint: string | null,
  message: Message,
  moves: List<Move>,
  capturedFigures: CapturedFigures,
  isNewGameModalOpened: boolean,
  gameSnapshots: List<GameState>
}
