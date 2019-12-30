import { List } from 'immutable'
import Field from './Field'

type Row = List<Field>

export default interface Board {
  board: List<Row>
}

const numbers = List([3, 4, 5, 6])
const letters = List(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])
const figures = List([
  'Rook',
  'Knight',
  'Bishop',
  'King',
  'Queen',
  'Bishop',
  'Knight',
  'Rook'
])

const blackFiguresRow = letters.zip(figures).map(([l, f]) => {
  return { coordinate: `${l}1`, figure: { type: f, color: 'Black' } }
}) as Row

const blackPawnRow = letters.map(l => {
  return { coordinate: `${l}2`, figure: { type: 'Pawn', color: 'Black' } }
}) as Row

const emptyRows = numbers.map(n => {
  return letters.map(l => {
    return { coordinate: `${l + n}`, figure: { type: 'Empty', color: 'None' } }
  })
}) as List<Row>

const whitePawnRow = letters.map(l => {
  return { coordinate: `${l}7`, figure: { type: 'Pawn', color: 'White' } }
}) as Row

const whiteFiguresRow = letters.zip(figures).map(([l, f]) => {
  return { coordinate: `${l}8`, figure: { type: f, color: 'White' } }
}) as Row

const initBoard = List([blackFiguresRow])
  .push(List(blackPawnRow))
  .concat(emptyRows)
  .push(whitePawnRow)
  .push(whiteFiguresRow)

export { initBoard }
