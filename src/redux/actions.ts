import { createAction } from '@reduxjs/toolkit'

const makeMove = createAction('Make move', coordinates => coordinates)
const newGame = createAction('New game', gameId => gameId)

export { makeMove, newGame }
