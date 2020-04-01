import { List } from 'immutable'
import Color from './color.model'
import FetchingData from './fetching-data.model'
import Message from './message.model'
import Move from './move.model'
import CapturedFigures from './captured-figures.model'
import GameMode from './game.mode'
import { Row } from './row-type'

export default interface GameState {
  gameId: string | null,
  gameMode: GameMode,
  board: List<Row>,
  status: string,
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
