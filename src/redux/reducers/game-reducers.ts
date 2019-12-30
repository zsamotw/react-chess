import { createReducer } from '@reduxjs/toolkit'
import { makeMove } from '../actions'
import { rows } from '../../models/Board'
import { List } from 'immutable'
import Field from '../../models/Field'
import Store from '../../models/Store'

type Row = List<Field>

const initialState = {
  gameId: null,
  board: rows
} as Store

const gameReducer = createReducer(initialState, {
  [makeMove.type]: state => state
})

export { gameReducer }
