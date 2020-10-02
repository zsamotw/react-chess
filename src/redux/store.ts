import { configureStore } from '@reduxjs/toolkit'
import { gameReducer } from './reducers/game-reducers'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './actions'

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({ reducer: gameReducer, middleware: [sagaMiddleware]  })
sagaMiddleware.run(rootSaga)

export default { store }