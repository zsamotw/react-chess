type Color = 'Black' | 'White' | 'None'
type Type = 'King' | 'Queen' | 'Rook' | 'Knight' | 'Bishop' | 'Pawn' | 'Empty'

export default interface Figure {
  type: Type
  icon: string
  color: Color
}
