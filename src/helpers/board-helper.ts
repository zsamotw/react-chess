import Color from "../models/color"
import MessageStatus from "../models/message-status"

const parseMoveData = (from: string, to: string) => {
  const [fromFieldLetter, fromRowNumber] = from.split('')
  const [toFieldLetter, toRowNumber] = to.split('')
  return {
    fromRowIndex: mapNumberToIndex(fromRowNumber),
    fromFieldIndex: mapLetterToFieldIndex(fromFieldLetter),
    toRowIndex: mapNumberToIndex(toRowNumber),
    toFieldIndex: mapLetterToFieldIndex(toFieldLetter)
  }
}

const mapLetterToFieldIndex = (letter: string) => {
  switch (letter) {
    case 'a':
      return 0
    case 'b':
      return 1
    case 'c':
      return 2
    case 'd':
      return 3
    case 'e':
      return 4
    case 'f':
      return 5
    case 'g':
      return 6
    case 'h':
      return 7
  }
}

const mapNumberToIndex = (rowNumber: string) => 8 - parseInt(rowNumber)

const switchPlayerColor = (playerColor: Color) => playerColor === Color.white ? Color.black : Color.white

const getMessage = (apiStatus: string, from: string, to: string, currentPlayerColor: Color) => {
  switch (apiStatus) {
    case 'game continues':
      return { content: `${currentPlayerColor}: ${from} -> ${to}`, status: MessageStatus.success }
    case 'checkmate':
      return { content: `Game Over: ${currentPlayerColor} WIN`, status: MessageStatus.info }
    default:
      return { content: `${currentPlayerColor}: ${from} -> ${to}`, status: MessageStatus.success }
  }
}

export { parseMoveData, switchPlayerColor, getMessage }
