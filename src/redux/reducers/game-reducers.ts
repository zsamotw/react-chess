import { createReducer } from '@reduxjs/toolkit'
import {
  makeFigureMove,
  newGame,
  forbiddenMove,
  setFromCoordinate
} from '../actions'
import { rows } from '../../models/board-model'
import { Record } from 'immutable'
import GameState from '../../models/store-model'
import {
  handleNewGameId,
  handleMakeFigureMove,
  handleForbiddenMove,
  handleSetFromCoordinate
} from '../action-handlers'

const makeInitialState = Record({
  gameId: null,
  board: null,
  fromCoordinate: '',
  message: 'Start new game!'
} as GameState)

const initialGameState = makeInitialState({ gameId: null, board: rows })

const gameReducer = createReducer(initialGameState, {
  [newGame.type]: (state, action) =>
    handleNewGameId(
      initialGameState as Record<GameState> & Readonly<GameState>,
      action.payload
    ),
  [setFromCoordinate.type]: (state, action) =>
    handleSetFromCoordinate(
      state as Record<GameState> & Readonly<GameState>,
      action.payload
    ),
  [makeFigureMove.type]: (state, action) => {
    const { from, to } = action.payload
    return handleMakeFigureMove(
      state as Record<GameState> & Readonly<GameState>,
      from,
      to
    )
  },
  [forbiddenMove.type]: (state, action) =>
    handleForbiddenMove(state as Record<GameState> & Readonly<GameState>)
})

export { gameReducer }
