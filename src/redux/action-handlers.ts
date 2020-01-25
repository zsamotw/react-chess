import { List, Record } from 'immutable'
import GameState from '../models/store-model'
import { parseMoveData } from '../helpers/board-helper'
import Field from '../models/field-model'

type Row = List<Field>

const handleNewGameId = (
  state: Record<GameState> & Readonly<GameState>,
  gameId: string
) => {
  state = state.set('message', 'Start new game').set('gameId', gameId)
  return state
}

const handleMakeMove = (
  state: Record<GameState> & Readonly<GameState>,
  coordinates: string
) => {
  const {
    fromRowIndex,
    fromFieldIndex,
    toRowIndex,
    toFieldIndex
  } = parseMoveData(coordinates)
  const board = state.get('board') as List<Row>
  const fieldFrom = board.getIn([fromRowIndex, fromFieldIndex])
  const fieldTo = board.getIn([toRowIndex, toFieldIndex])
  const figure = fieldFrom.figure
  const newEmptyField = {
    coordinate: fieldFrom.coordinate,
    figure: { type: 'Empty', symbol: '', color: 'None' }
  }
  const newNotEmptyField = { coordinate: fieldTo.coordinate, figure }
  const newBoard = board
    .setIn([fromRowIndex, fromFieldIndex], newEmptyField)
    .setIn([toRowIndex, toFieldIndex], newNotEmptyField)
  const newState = state
    .set('board', newBoard)
    .set('message', 'Your move is done')

  return newState
}

const handleForbiddenMove = (
  state: Record<GameState> & Readonly<GameState>
) => {
  state = state.set('message', 'This move is forbidden')
  return state
}

export { handleNewGameId, handleMakeMove, handleForbiddenMove }
