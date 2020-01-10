import { createReducer } from '@reduxjs/toolkit'
import { makeMove } from '../actions'
import { rows } from '../../models/board-model'
import { List } from 'immutable'
import Field from '../../models/field-model'
import Store from '../../models/store-model'
import { parseMoveData } from '../../helpers/board-helper'

type Row = List<Field>

const initialState = {
  gameId: null,
  board: rows
} as Store

const handleMakeMove = (state: Store, coordinates: string) => {
  const { fromRowIndex, fromFieldIndex, toRowIndex, toFieldIndex } = parseMoveData(coordinates)
  const board = state.board as List<Row>
  const fieldFrom = board.getIn([fromRowIndex, fromFieldIndex])
  const fieldTo = board.getIn([toRowIndex, toFieldIndex])
  const figure = fieldFrom.figure
  const newEmptyField = {coordinate: fieldFrom.coordinate, figure: { type: 'Empty', symbol: '', color: 'None' }}
  const newNotEmptyField = {coordinate: fieldTo.coordinate, figure}
  const newBoard = board.setIn([fromRowIndex, fromFieldIndex], newEmptyField).setIn([toRowIndex, toFieldIndex], newNotEmptyField )
  state.board = newBoard
  
  return state
}

const gameReducer = createReducer(initialState, {
  [makeMove.type]: ( state, action ) => handleMakeMove(state, action.payload)
})

export { gameReducer }
