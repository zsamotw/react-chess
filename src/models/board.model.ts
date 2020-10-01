import { List } from 'immutable'
import { Row } from './row-type'
import BlackPawn from '../../public/images/Chess_pdt45.svg'
import WhitePawn from '../../public/images/Chess_plt45.svg'
import WhiteRook from  '../../public/images/Chess_rlt45.svg'
import WhiteKnight from  '../../public/images/Chess_nlt45.svg'
import WhiteBishop from '../../public/images/Chess_blt45.svg'
import WhiteQueen from  '../../public/images/Chess_qlt45.svg'
import WhiteKing from  '../../public/images/Chess_klt45.svg'
import BlackRook from  '../../public/images/Chess_rdt45.svg'
import BlackKnight from  '../../public/images/Chess_ndt45.svg'
import BlackBishop from  '../../public/images/Chess_bdt45.svg'
import BlackQueen from  '../../public/images/Chess_qdt45.svg'
import BlackKing from  '../../public/images/Chess_kdt45.svg'
import Color from './color.model'
import FigureType from './figure-type.model'

export interface Board {
  rows: List<Row>
}

//* Initial board config */

const numbers = List([6, 5, 4, 3])
const letters = List(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])
const types = List([
  FigureType.rook,
  FigureType.knight,
  FigureType.bishop,
  FigureType.king,
  FigureType.queen,
  FigureType.bishop,
  FigureType.knight,
  FigureType.rook
])

const whiteIcons = List([
  WhiteRook,
  WhiteKnight,
  WhiteBishop,
  WhiteQueen,
  WhiteKing,
  WhiteBishop,
  WhiteKnight,
  WhiteRook
])

const blackIcons = List([
  BlackRook,
  BlackKnight,
  BlackBishop,
  BlackQueen,
  BlackKing,
  BlackBishop,
  BlackKnight,
  BlackRook
])

const whiteFigures = types.zip(whiteIcons)
const blackFigures = types.zip(blackIcons)

const blackFiguresRow = letters.zip(blackFigures).map(([l, [t, s]]) => {
  return {coordinates : `${l}8`, figure: { type: t, icon: s, color: Color.black } }
}) as Row

const blackPawnRow = letters.map(l => {
  return {
    coordinates: `${l}7`,
    figure: { type: FigureType.pawn, icon: BlackPawn, color: Color.black }
  }
}) as Row

const emptyRows = numbers.map(n => {
  return letters.map(l => {
    return {
      coordinates: `${l + n}`,
      figure: { type: FigureType.empty, icon: '', color: Color.none }
    }
  })
}) as List<Row>

const whitePawnRow = letters.map(l => {
  return {
    coordinates: `${l}2`,
    figure: { type: FigureType.pawn, icon: WhitePawn, color: Color.white }
  }
}) as Row

const whiteFiguresRow = letters.zip(whiteFigures).map(([l, [t, s]]) => {
  return { coordinates: `${l}1`, figure: { type: t, icon: s, color: Color.white } }
}) as Row

const rows = List([blackFiguresRow])
  .push(List(blackPawnRow))
  .concat(emptyRows)
  .push(whitePawnRow)
  .push(whiteFiguresRow)

export { rows }
