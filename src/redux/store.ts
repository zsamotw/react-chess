import { configureStore } from '@reduxjs/toolkit'
import { gameReducer } from './reducers/game-reducers'

const store = configureStore({ reducer: gameReducer })

export default { store }
