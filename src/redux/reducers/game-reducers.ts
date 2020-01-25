import { createReducer } from '@reduxjs/toolkit'
import { makeMove, newGame, forbiddenMove } from '../actions'
import { rows } from '../../models/board-model'
import { Record } from 'immutable'
import GameState from '../../models/store-model'
import { handleNewGameId, handleMakeMove, handleForbiddenMove } from '../action-handlers'

const makeInitialState = Record({
  gameId: null,
  board: null,
  message: 'Start new game!'
} as GameState)

const initialGameState = makeInitialState({ gameId: null, board: rows })

const gameReducer = createReducer(initialGameState, {
  [newGame.type]: (state, action) =>
    handleNewGameId(
      initialGameState as Record<GameState> & Readonly<GameState>,
      action.payload
    ),
  [makeMove.type]: (state, action) => {
    const { coordinates } = action.payload
    return handleMakeMove(
      state as Record<GameState> & Readonly<GameState>,
      coordinates
    )
  },
  [forbiddenMove.type]: (state, action) =>
    handleForbiddenMove(state as Record<GameState> & Readonly<GameState>)
})

export { gameReducer }
