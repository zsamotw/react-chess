import { List, Record } from 'immutable'
import GameState from '../models/store-model'
import { parseMoveData } from '../helpers/board-helper'
import Field from '../models/field-model'

type Row = List<Field>

const handleNewGameId = (
  state: Record<GameState> & Readonly<GameState>,
  gameId: string
) => {
  const newState = state.set('message', 'New game starts!').set('gameId', gameId)
  return newState
}

const handleSetFromCoordinate = (
  state: Record<GameState> & Readonly<GameState>,
  from: string
) => {
  const newState = state.set('fromCoordinate', from)
  return newState
}

const handleMakeFigureMove = (
  state: Record<GameState> & Readonly<GameState>,
  from: string,
  to: string
) => {
  const {
    fromRowIndex,
    fromFieldIndex,
    toRowIndex,
    toFieldIndex
  } = parseMoveData(from, to)
  const board = state.get('board') as List<Row>
  const fieldFrom = board.getIn([fromRowIndex, fromFieldIndex])
  const fieldTo = board.getIn([toRowIndex, toFieldIndex])
  const figure = fieldFrom.figure
  const newEmptyField = {
    coordinate: fieldFrom.coordinate,
    figure: { type: 'Empty', icon: '', color: 'None' }
  }
  const newNotEmptyField = { coordinate: fieldTo.coordinate, figure }
  const newBoard = board
    .setIn([fromRowIndex, fromFieldIndex], newEmptyField)
    .setIn([toRowIndex, toFieldIndex], newNotEmptyField)
  const newState = state
    .set('board', newBoard)
    .set('message', '')

  return newState
}

const handleForbiddenMove = (
  state: Record<GameState> & Readonly<GameState>
) => {
  state = state.set('message', 'This move is forbidden')
  return state
}

export { handleNewGameId, handleSetFromCoordinate, handleMakeFigureMove, handleForbiddenMove }