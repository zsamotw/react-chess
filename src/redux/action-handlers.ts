import { List, Record } from 'immutable'
import GameState from '../models/store-model'
import {
  parseMoveData,
  switchPlayerColor,
} from '../helpers/board-helper'
import Field from '../models/field-model'

type Row = List<Field>

const handleNewGameId = (
  state: Record<GameState> & Readonly<GameState>,
  gameId: string,
) => {
  const newState = state
    .set('message', 'New game starts!')
    .set('gameId', gameId)
  return newState
}

const handleSetFromCoordinates = (
  state: Record<GameState> & Readonly<GameState>,
  from: string,
) => {
  const newState = state.set('currentMoveStartingPoint', from)
  return newState
}

const handleMakeFigureMove = (
  state: Record<GameState> & Readonly<GameState>,
  from: string,
  to: string,
) => {
  const {
    fromRowIndex,
    fromFieldIndex,
    toRowIndex,
    toFieldIndex,
  } = parseMoveData(from, to)
  const board = state.get('board') as List<Row>
  const fieldFrom = board.getIn([fromRowIndex, fromFieldIndex])
  const fieldTo = board.getIn([toRowIndex, toFieldIndex])
  const figure = fieldFrom.figure
  const newEmptyField = {
    coordinates: fieldFrom.coordinates,
    figure: { type: 'Empty', icon: '', color: 'None' },
  }
  const newNotEmptyField = { coordinates: fieldTo.coordinates, figure }
  const newBoard = board
    .setIn([fromRowIndex, fromFieldIndex], newEmptyField)
    .setIn([toRowIndex, toFieldIndex], newNotEmptyField)
  const currentPlayerColor = state.get('activePlayerColor')
  const nextPlayerColor = switchPlayerColor(currentPlayerColor)
  const message = `${currentPlayerColor}: ${from} -> ${to}`
  const newState = state
    .set('board', newBoard)
    .set('activePlayerColor', nextPlayerColor)
    .set('message', message)

  return newState
}

const handleForbiddenMove = (
  state: Record<GameState> & Readonly<GameState>,
) => {
  state = state.set('message', 'This move is forbidden')
  return state
}

const handleSetIsFetchingMove = (
  state: Record<GameState> & Readonly<GameState>,
  isFetching: boolean,
) => {
  const fetchingData = state.get('fetchingData')
  const changedFetchingData = { ...fetchingData, isFetchingMove: isFetching }
  const newState = state.set('fetchingData', changedFetchingData)
  return newState
}

const handleSetIsFetchingGameId = (
  state: Record<GameState> & Readonly<GameState>,
  isFetching: boolean,
) => {
  const fetchingData = state.get('fetchingData')
  const changedFetchingData = { ...fetchingData, isFetchingNewGame: isFetching }
  const newState = state.set('fetchingData', changedFetchingData)
  return newState
}

const handleSetMessage = (
  state: Record<GameState> & Readonly<GameState>,
  message: string,
) => {
  const newState = state.set('message', message)
  return newState
}

export {
  handleNewGameId,
  handleSetFromCoordinates,
  handleMakeFigureMove,
  handleForbiddenMove,
  handleSetIsFetchingMove,
  handleSetIsFetchingGameId,
  handleSetMessage,
}
