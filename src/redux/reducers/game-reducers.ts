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
  setGameMode,
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
  handleSetLastGameSnapshot,
  handleSetGameMode,
} from '../action-handlers'
import Color from '../../models/color'
import GameMode from '../../models/game-mode'

const makeInitialState = Record({
  gameId: null,
  gameMode: GameMode.onePlayer,
  board: List([]),
  status: '',
  isGameOver: false,
  activePlayerColor: Color.white,
  fetchingData: { isFetchingGameId: false, isFetchingMove: false },
  currentMoveStartingPoint: null,
  message: { content: '', status: undefined },
  moves: List([]),
  capturedFigures: { white: List([]), black: List([]) },
  isNewGameModalOpened: true,
  gameSnapshots: List([]),
} as GameState)

const initialGameState = makeInitialState({ board: rows })

const gameReducer = createReducer(initialGameState, {
  [startNewGame.type]: (state, action) => {
    const gameMode = state.get('gameMode')
    const gameId = action.payload
    return handleStartNewGame(
      initialGameState as Record<GameState> & Readonly<GameState>,
      gameMode,
      gameId,
    )
  },
  [setGameMode.type]: (state, action) =>
    handleSetGameMode(state as any, action.payload),
  [setFromCoordinates.type]: (state, action) =>
    handleSetFromCoordinates(state as any, action.payload),
  [makeFigureMove.type]: (state, action) => {
    const { from, to, status } = action.payload
    return handleMakeFigureMove(state as any, from, to, status)
  },
  [forbiddenMove.type]: state => handleForbiddenMove(state as any),
  [setIsFetchingMove.type]: (state, action) =>
    handleSetIsFetchingMove(state as any, action.payload),
  [setIsFetchingGameId.type]: (state, action) =>
    handleSetIsFetchingGameId(state as any, action.payload),
  [setMessage.type]: (state, action) =>
    handleSetMessage(state as any, action.payload),
  [setNewGameModalOpened.type]: state =>
    handleSetNewGameModalOpened(state as any),
  [setNewGameModalClosed.type]: state =>
    handleSetNewGameModalClosed(state as any),
  [setLastGameSnapshot.type]: state => handleSetLastGameSnapshot(state as any),
})

export { gameReducer }
