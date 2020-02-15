import { createReducer } from '@reduxjs/toolkit'
import {
  makeFigureMove,
  startNewGame,
  forbiddenMove,
  setFromCoordinates,
  setIsFetchingMove,
  setIsFetchingGameId,
  setMessage,
} from '../actions'
import { rows } from '../../models/board-model'
import { Record } from 'immutable'
import GameState from '../../models/store-model'
import {
  handleStartNewGame,
  handleMakeFigureMove,
  handleForbiddenMove,
  handleSetFromCoordinates,
  handleSetIsFetchingMove,
  handleSetIsFetchingGameId,
  handleSetMessage,
} from '../action-handlers'
import Color from '../../models/color'
import MessageStatus from '../../models/message-status'

const makeInitialState = Record({
  gameId: null,
  board: null,
  activePlayerColor: Color.white,
  fetchingData: { isFetchingGameId: false, isFetchingMove: false },
  currentMoveStartingPoint: null,
  message: { content: 'Start new game', status: MessageStatus.info },
  gameOver: false
} as GameState)

const initialGameState = makeInitialState({ board: rows })

const gameReducer = createReducer(initialGameState, {
  [startNewGame.type]: (state, action) =>
    handleStartNewGame(
      initialGameState as Record<GameState> & Readonly<GameState>,
      action.payload,
    ),
  [setFromCoordinates.type]: (state, action) =>
    handleSetFromCoordinates(
      state as Record<GameState> & Readonly<GameState>,
      action.payload,
    ),
  [makeFigureMove.type]: (state, action) => {
    const { from, to, status } = action.payload
    return handleMakeFigureMove(
      state as Record<GameState> & Readonly<GameState>,
      from,
      to,
      status
    )
  },
  [forbiddenMove.type]: (state, action) =>
    handleForbiddenMove(state as Record<GameState> & Readonly<GameState>),
  [setIsFetchingMove.type]: (state, action) =>
    handleSetIsFetchingMove(
      state as Record<GameState> & Readonly<GameState>,
      action.payload,
    ),
  [setIsFetchingGameId.type]: (state, action) =>
    handleSetIsFetchingGameId(
      state as Record<GameState> & Readonly<GameState>,
      action.payload,
    ),
  [setMessage.type]: (state, action) =>
    handleSetMessage(
      state as Record<GameState> & Readonly<GameState>,
      action.payload,
    ),
})

export { gameReducer }
