import { List } from 'immutable'
import { Field } from './field-model'

type Row = List<Field>

export interface Board {
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

const whiteIcons = List([
  'icons/Chess_rlt45.svg',
  'icons/Chess_nlt45.svg',
  'icons/Chess_blt45.svg',
  'icons/Chess_qlt45.svg',
  'icons/Chess_klt45.svg',
  'icons/Chess_blt45.svg',
  'icons/Chess_nlt45.svg',
  'icons/Chess_rlt45.svg'
])

const blackIcons = List([
  'icons/Chess_rdt45.svg',
  'icons/Chess_ndt45.svg',
  'icons/Chess_bdt45.svg',
  'icons/Chess_qdt45.svg',
  'icons/Chess_kdt45.svg',
  'icons/Chess_bdt45.svg',
  'icons/Chess_ndt45.svg',
  'icons/Chess_rdt45.svg'
])

const whiteFigures = types.zip(whiteIcons)
const blackFigures = types.zip(blackIcons)

const blackFiguresRow = letters.zip(blackFigures).map(([l, [t, s]]) => {
  return {coordinates : `${l}8`, figure: { type: t, icon: s, color: 'Black' } }
}) as Row

const blackPawnRow = letters.map(l => {
  return {
    coordinates: `${l}7`,
    figure: { type: 'Pawn', icon: 'icons/Chess_pdt45.svg', color: 'Black' }
  }
}) as Row

const emptyRows = numbers.map(n => {
  return letters.map(l => {
    return {
      coordinates: `${l + n}`,
      figure: { type: 'Empty', icon: '', color: 'None' }
    }
  })
}) as List<Row>

const whitePawnRow = letters.map(l => {
  return {
    coordinates: `${l}2`,
    figure: { type: 'Pawn', icon: 'icons/Chess_plt45.svg', color: 'White' }
  }
}) as Row

const whiteFiguresRow = letters.zip(whiteFigures).map(([l, [t, s]]) => {
  return { coordinates: `${l}1`, figure: { type: t, icon: s, color: 'White' } }
}) as Row

const rows = List([blackFiguresRow])
  .push(List(blackPawnRow))
  .concat(emptyRows)
  .push(whitePawnRow)
  .push(whiteFiguresRow)

export { rows }
