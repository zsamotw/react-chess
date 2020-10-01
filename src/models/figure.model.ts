import Color from '../models/color.model'
import FigureType from '../models/figure-type.model'

export default interface Figure {
  type: FigureType
  icon: string
  color: Color
}
