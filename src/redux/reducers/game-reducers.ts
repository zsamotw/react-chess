import { createReducer } from '@reduxjs/toolkit'
import {
  makeFigureMove,
  startNewGame,
  forbiddenMove,
  setFromCoordinates,
  setIsFetchingMove,
  setIsFetchingGameId,
  setMessage,
  setNewGameModalClosed,
  setNewGameModalOpened,
  setLastGameSnapshot,
} from '../actions'
import { rows } from '../../models/board-model'
import { Record, List } from 'immutable'
import GameState from '../../models/store-model'
import {
  handleStartNewGame,
  handleMakeFigureMove,
  handleForbiddenMove,
  handleSetFromCoordinates,
  handleSetIsFetchingMove,
  handleSetIsFetchingGameId,
  handleSetMessage,
  handleSetNewGameModalOpened,
  handleSetNewGameModalClosed,
  handleSetLastGameSnapshot
} from '../action-handlers'
import Color from '../../models/color'

const makeInitialState = Record({
  gameId: null,
  board: List([]),
  isGameOver: false,
  activePlayerColor: Color.white,
  fetchingData: { isFetchingGameId: false, isFetchingMove: false },
  currentMoveStartingPoint: null,
  message: { content: '', status: undefined },
  moves: List([]),
  capturedFigures: { white: List([]), black: List([]) },
  isNewGameModalOpened: true,
  gameSnapshots: List([])
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
      status,
    )
  },
  [forbiddenMove.type]: (state) =>
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
  [setNewGameModalOpened.type]: (state) =>
    handleSetNewGameModalOpened(
      state as Record<GameState> & Readonly<GameState>,
    ),
  [setNewGameModalClosed.type]: (state) =>
    handleSetNewGameModalClosed(
      state as Record<GameState> & Readonly<GameState>,
    ),
  [setLastGameSnapshot.type]: (state) =>
    handleSetLastGameSnapshot(
      state as Record<GameState> & Readonly<GameState>
    ),
})

export { gameReducer }
