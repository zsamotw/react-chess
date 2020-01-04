import { createReducer } from '@reduxjs/toolkit'
import { makeMove } from '../actions'
import { rows } from '../../models/board-model'
import { List } from 'immutable'
import Field from '../../models/field-model'
import Store from '../../models/store-model'

type Row = List<Field>

const initialState = {
  gameId: null,
  board: rows
} as Store

const gameReducer = createReducer(initialState, {
  [makeMove.type]: state => state
})

export { gameReducer }
