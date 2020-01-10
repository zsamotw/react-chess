import { configureStore } from '@reduxjs/toolkit'
import { gameReducer } from './reducers/game-reducers'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const store = configureStore({ reducer: gameReducer,middleware: [thunk, logger]  })

export default { store }