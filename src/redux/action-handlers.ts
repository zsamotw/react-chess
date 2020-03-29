import { List, Record } from 'immutable'
import GameState from '../models/store-model'
import {
  switchPlayerColor,
  computeCapturedFigures,
  getBoardAfterMove,
} from '../helpers/board-helper'
import { Field } from '../models/field-model'
import MessageStatus from '../models/message-status'
import Message from '../models/message'
import Move from '../models/move-model'
import GameMode from '../models/game-mode'

type Row = List<Field>

const handleStartNewGame = (
  state: Record<GameState> & Readonly<GameState>,
  gameMode: GameMode,
  gameId: string,
) => {
  const message = {content: 'New game starts', status: MessageStatus.info}
  const nextState = state
    .set('message', message)
    .set('gameId', gameId)
    .set('isGameOver', false)
    .set('isNewGameModalOpened', false)
    .set('gameMode', gameMode)
  return nextState
}

const handleSetGameMode = (
  state: Record<GameState> & Readonly<GameState>,
  gameMode: GameMode,
) => {
  const content = gameMode === GameMode.onePlayer ? 'One player mode' : 'Two players mode'
  const message = {content, status: MessageStatus.info}
  const nextState = state
    .set('message', message)
    .set('gameMode', gameMode)
  return nextState
}

const handleSetFromCoordinates = (
  state: Record<GameState> & Readonly<GameState>,
  from: string,
) => {
  const nextState = state.set('currentMoveStartingPoint', from)
  return nextState
}

const handleMakeFigureMove = (
  state: Record<GameState> & Readonly<GameState>,
  from: string,
  to: string,
  status: string
) => {
  const board = state.get('board') as List<Row>
  const { nextBoard, possibleCapturedFigure } = getBoardAfterMove(from, to, board)
  const currentPlayerColor = state.get('activePlayerColor')
  const nextPlayerColor = switchPlayerColor(currentPlayerColor)
  const move = { startingPointCoordinate: from, endPointCoordinate: to, color: currentPlayerColor} as Move
  const moves = state.get('moves').unshift(move)
  const capturedFigures = state.get('capturedFigures')
  const nextCapturedFigures = computeCapturedFigures(possibleCapturedFigure, capturedFigures)
  const isGameOver = status !== 'game continues'
  const nextGameSnapshots = state.get('gameSnapshots').unshift(state)
  const nextState = state
    .set('board', nextBoard)
    .set('status', status)
    .set('isGameOver', isGameOver)
    .set('activePlayerColor', nextPlayerColor)
    .set('moves', moves)
    .set('capturedFigures', nextCapturedFigures)
    .set('gameSnapshots', nextGameSnapshots)

  return nextState
}

const handleForbiddenMove = (
  state: Record<GameState> & Readonly<GameState>,
) => {
  const message = {content: 'It is forbidden move', status: MessageStatus.warning}
  const nextState = state.set('message', message)
  return nextState
}

const handleSetIsFetchingMove = (
  state: Record<GameState> & Readonly<GameState>,
  isFetching: boolean,
) => {
  const fetchingData = state.get('fetchingData')
  const changedFetchingData = { ...fetchingData, isFetchingMove: isFetching }
  const nextState = state.set('fetchingData', changedFetchingData)
  return nextState
}

const handleSetIsFetchingGameId = (
  state: Record<GameState> & Readonly<GameState>,
  isFetching: boolean,
) => {
  const fetchingData = state.get('fetchingData')
  const changedFetchingData = { ...fetchingData, isFetchingGameId: isFetching }
  const nextState = state.set('fetchingData', changedFetchingData)
  return nextState
}

const handleSetMessage = (
  state: Record<GameState> & Readonly<GameState>,
  message: Message,
) => {
  const nextState = state.set('message', message)
  return nextState
}

const handleSetNewGameModalOpened = (
  state: Record<GameState> & Readonly<GameState>,
) => {
  const nextState = state.set('isNewGameModalOpened', true)
  return nextState
}

const handleSetNewGameModalClosed = (
  state: Record<GameState> & Readonly<GameState>,
) => {
  const nextState = state.set('isNewGameModalOpened', false)
  return nextState
}

const handleSetLastGameSnapshot = (
  state: Record<GameState> & Readonly<GameState>,
) => {
  const lastGameSnapshot = state.get('gameSnapshots').first() as Record<GameState> & Readonly<GameState>
  const restGameSnapshots = state.get('gameSnapshots').shift()

  if (restGameSnapshots.size > 0) {
    const nextState = lastGameSnapshot.set('gameSnapshots', restGameSnapshots)
    return nextState
  } else {
    const message = {content: 'No moves to undo', status: MessageStatus.warning}
    const nextState = state.set('message', message)
    return nextState
  }
}


export {
  handleStartNewGame,
  handleSetGameMode,
  handleSetFromCoordinates,
  handleMakeFigureMove,
  handleForbiddenMove,
  handleSetIsFetchingMove,
  handleSetIsFetchingGameId,
  handleSetMessage,
  handleSetNewGameModalOpened,
  handleSetNewGameModalClosed,
  handleSetLastGameSnapshot
}
