import Color from '../models/color.model'
type Type = 'King' | 'Queen' | 'Rook' | 'Knight' | 'Bishop' | 'Pawn' | 'Empty'

export default interface Figure {
  type: Type
  icon: string
  color: Color
}
