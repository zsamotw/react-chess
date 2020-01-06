import { List } from 'immutable'
import Field from './field-model'

type Row = List<Field>

export default interface Board {
  rows: List<Row>
}

//* Initial board config */

const numbers = List([6, 5, 4, 3])
const letters = List(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])
const types = List([
  'Rook',
  'Knight',
  'Bishop',
  'King',
  'Queen',
  'Bishop',
  'Knight',
  'Rook'
])

const symbols = List(['R', 'Kn', 'B', 'K', 'Q', 'B', 'Kn', 'R'])

const figures = types.zip(symbols)

const blackFiguresRow = letters.zip(figures).map(([l, [t, s]]) => {
  return { coordinate: `${l}8`, figure: { type: t, symbol: s, color: 'Black' } }
}) as Row

const blackPawnRow = letters.map(l => {
  return {
    coordinate: `${l}7`,
    figure: { type: 'Pawn', symbol: 'P', color: 'Black' }
  }
}) as Row

const emptyRows = numbers.map(n => {
  return letters.map(l => {
    return {
      coordinate: `${l + n}`,
      figure: { type: 'Empty', symbol: '', color: 'None' }
    }
  })
}) as List<Row>

const whitePawnRow = letters.map(l => {
  return {
    coordinate: `${l}2`,
    figure: { type: 'Pawn', symbol: 'P', color: 'White' }
  }
}) as Row

const whiteFiguresRow = letters.zip(figures).map(([l, [t, s]]) => {
  return { coordinate: `${l}1`, figure: { type: t, symbol: s, color: 'White' } }
}) as Row

const rows = List([blackFiguresRow])
  .push(List(blackPawnRow))
  .concat(emptyRows)
  .push(whitePawnRow)
  .push(whiteFiguresRow)

export { rows }
