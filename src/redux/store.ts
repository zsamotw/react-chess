import { configureStore } from '@reduxjs/toolkit'
import { gameReducer } from './reducers/game-reducers'
import thunk from 'redux-thunk'

const store = configureStore({ reducer: gameReducer,middleware: [thunk]  })

export default { store }