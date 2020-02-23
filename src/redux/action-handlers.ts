import { List, Record } from 'immutable'
import GameState from '../models/store-model'
import {
  parseMoveData,
  switchPlayerColor,
  computeCapturedFigures,
} from '../helpers/board-helper'
import { Field } from '../models/field-model'
import MessageStatus from '../models/message-status'
import Message from '../models/message'
import Move from '../models/move-model'

type Row = List<Field>

const handleStartNewGame = (
  state: Record<GameState> & Readonly<GameState>,
  gameId: string,
) => {
  const message = {content: 'New game starts', status: MessageStatus.info}
  const newState = state
    .set('message', message)
    .set('gameId', gameId)
    .set('isGameOver', false)
    .set('isNewGameModalOpened', false)
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
  status: string
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
  const move = { startingPointCoordinate: from, endPointCoordinate: to, color: currentPlayerColor} as Move
  const moves = state.get('moves').unshift(move)
  const capturedFigures = state.get('capturedFigures')
  const newCapturedFigures = computeCapturedFigures(fieldTo.figure, capturedFigures)
  const isGameOver = status === 'check mate' ? true : false
  const newState = state
    .set('board', newBoard)
    .set('isGameOver', isGameOver)
    .set('activePlayerColor', nextPlayerColor)
    .set('moves', moves)
    .set('capturedFigures', newCapturedFigures)

  return newState
}

const handleForbiddenMove = (
  state: Record<GameState> & Readonly<GameState>,
) => {
  const message = {content: 'It is forbidden move', status: MessageStatus.warning}
  state = state.set('message', message)
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
  const changedFetchingData = { ...fetchingData, isFetchingGameId: isFetching }
  const newState = state.set('fetchingData', changedFetchingData)
  return newState
}

const handleSetMessage = (
  state: Record<GameState> & Readonly<GameState>,
  message: Message,
) => {
  const newState = state.set('message', message)
  return newState
}

const handleSetNewGameModalOpened = (
  state: Record<GameState> & Readonly<GameState>,
) => {
  const newState = state.set('isNewGameModalOpened', true)
  return newState
}

const handleSetNewGameModalClosed = (
  state: Record<GameState> & Readonly<GameState>,
) => {
  const newState = state.set('isNewGameModalOpened', false)
  return newState
}

export {
  handleStartNewGame,
  handleSetFromCoordinates,
  handleMakeFigureMove,
  handleForbiddenMove,
  handleSetIsFetchingMove,
  handleSetIsFetchingGameId,
  handleSetMessage,
  handleSetNewGameModalOpened,
  handleSetNewGameModalClosed
}
