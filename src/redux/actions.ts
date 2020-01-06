import { createAction } from '@reduxjs/toolkit'

const makeMove = createAction('Make move', coordinates => coordinates)

export { makeMove }
