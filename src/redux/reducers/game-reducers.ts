import { createReducer } from '@reduxjs/toolkit'
import { makeMove, newGame } from '../actions'
import { rows } from '../../models/board-model'
import { List, Record } from 'immutable'
import GameState from '../../models/store-model'
import { parseMoveData } from '../../helpers/board-helper'
import Field from '../../models/field-model'

type Row = List<Field>

const makeInitialState = Record({
  gameId: null,
  board: null
} as GameState)

const initialGameState = makeInitialState({ gameId: null, board: rows })

const handleMakeMove = (
  state: Record<GameState> & Readonly<GameState>,
  coordinates: string
) => {
  const {
    fromRowIndex,
    fromFieldIndex,
    toRowIndex,
    toFieldIndex
  } = parseMoveData(coordinates)
  const board = state.get('board') as List<Row>
  const fieldFrom = board.getIn([fromRowIndex, fromFieldIndex])
  const fieldTo = board.getIn([toRowIndex, toFieldIndex])
  const figure = fieldFrom.figure
  const newEmptyField = {
    coordinate: fieldFrom.coordinate,
    figure: { type: 'Empty', symbol: '', color: 'None' }
  }
  const newNotEmptyField = { coordinate: fieldTo.coordinate, figure }
  const newBoard = board
    .setIn([fromRowIndex, fromFieldIndex], newEmptyField)
    .setIn([toRowIndex, toFieldIndex], newNotEmptyField)
  const newState = state.set('board', newBoard)

  return newState
}

const handleNewGameId = (
  state: Record<GameState> & Readonly<GameState>,
  gameId: string
) => {
  return state.set('gameId', gameId)
}

const gameReducer = createReducer(initialGameState, {
  [makeMove.type]: (state, action) =>
    handleMakeMove(
      state as Record<GameState> & Readonly<GameState>,
      action.payload
    ),
  [newGame.type]: (state, action) =>
    handleNewGameId(
      state as Record<GameState> & Readonly<GameState>,
      action.payload
    )
})

export { gameReducer }
