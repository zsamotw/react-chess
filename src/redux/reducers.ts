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
} from './actions'
import { rows } from '../models/board.model'
import { Record, List } from 'immutable'
import GameState from '../models/store.model'
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
} from './action-handlers'
import Color from '../models/color.model'
import GameMode from '../models/game.mode'

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
  gameSnapshots: List([])
} as GameState)

const initialGameState = makeInitialState({ board: rows })

const gameReducers = createReducer(initialGameState, {
  [startNewGame.type]: (state, action) => {
    const gameMode = state.get('gameMode')
    const { game_id } = action.payload
    return handleStartNewGame(
      initialGameState as Record<GameState> & Readonly<GameState>,
      gameMode,
      game_id,
    )
  },
  [setGameMode.type]: (state, action) => {
    const { gameMode } = action.payload
    return handleSetGameMode(state as any, gameMode)
  },
  [setFromCoordinates.type]: (state, action) => {
    const { fromCoordinates } = action.payload
    return handleSetFromCoordinates(state as any, fromCoordinates)
  },
  [makeFigureMove.type]: (state, action) => {
    const { from, to, status } = action.payload
    return handleMakeFigureMove(state as any, from, to, status)
  },
  [forbiddenMove.type]: state => handleForbiddenMove(state as any),
  [setIsFetchingMove.type]: (state, action) => {
    const { isFetchingMove } = action.payload
    return handleSetIsFetchingMove(state as any, isFetchingMove)
  },
  [setIsFetchingGameId.type]: (state, action) => {
    const { isFetchingGameId } = action.payload
    return handleSetIsFetchingGameId(state as any, isFetchingGameId)
  },
  [setMessage.type]: (state, action) => {
    const { message } = action.payload
    return handleSetMessage(state as any, message)
  },
  [setNewGameModalOpened.type]: state =>
    handleSetNewGameModalOpened(state as any),
  [setNewGameModalClosed.type]: state =>
    handleSetNewGameModalClosed(state as any),
  [setLastGameSnapshot.type]: state => handleSetLastGameSnapshot(state as any),
})

export { gameReducers }
