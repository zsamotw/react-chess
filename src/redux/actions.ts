import { createAction } from '@reduxjs/toolkit'
import axios from 'axios'
import MessageStatus from '../models/message-status.model'
import GameMode from '../models/game.mode'
import { call, put, takeLatest, select, all } from 'redux-saga/effects'
import { getGameId, getGameMode, getCurrentMoveStartingPoint, getIsGameOver } from './selectors'

const axios$ = axios.create({
  baseURL: 'http://chess-api-chess.herokuapp.com/api/v1/chess'
})

// Actions

const startNewGame = createAction('New game', gameId => gameId)
const setGameMode = createAction('Set game mode', gameMode => gameMode)
const makeFigureMove = createAction('Make move', coordinates => coordinates)
const setFromCoordinates = createAction('Set from coordinates', coordinates => coordinates,)
const forbiddenMove = createAction('Forbidden move')
const setMessage = createAction('Set message', message => message)
const setIsFetchingMove = createAction('Set isFetchingMove', isFetching => isFetching,)
const setIsFetchingGameId = createAction('Set isFetchingGameId', isFetching => isFetching,)
const setNewGameModalOpened = createAction('Set new game modal opened')
const setNewGameModalClosed = createAction('Set new game modal closed')
const setLastGameSnapshot = createAction('Set last game snapshot')

const makePlayerMoveApiRequest = createAction('make player move api request', to => to)
const makeComputerMoveApiRequest = createAction('make computer move api request', game_id => game_id)
const startNewGameApiRequest = createAction('start new game api request', gameMode => gameMode)

//helper function for API POST request
const makeApiRequest = (url: string) => (data: { from: string, to: string, game_id: string } | { game_id: string }) => {
  return axios$.request({
    method: 'post',
    url: url,
    data
  });
}

// Sagas

function* makePlayerMove(action: any) {
  const { to } = action.payload
  const from = yield select(getCurrentMoveStartingPoint)
  if (from !== to) {
    yield put(setIsFetchingMove({ payload: true }))
    try {
      const game_id = yield select(getGameId)
      const gameMode = yield select(getGameMode)
      const urlPostMove = gameMode === GameMode.onePlayer ? '/one/move/player' : '/two/move'
      const { data } = yield call(makeApiRequest(urlPostMove), { from, to, game_id })

      if (data.status === 'error: invalid move!') {
        yield put(forbiddenMove())
      } else {
        const urlPostCheck = gameMode === GameMode.onePlayer ? '/one/check' : '/two/check'
        const { data } = yield call(makeApiRequest(urlPostCheck), { game_id })
        const { status } = data
        const isGameOver = yield select(getIsGameOver)
        yield put(makeFigureMove({ payload: { from, to, status } }))
        if (gameMode === GameMode.onePlayer && !isGameOver) {
          yield put(makeComputerMoveApiRequest({ payload: { game_id } }))
        }
      }

    }
    catch {
      const message = { content: 'Oops. Check internet connection', status: MessageStatus.error }
      yield put(setMessage({ payload: message }))
      yield put(setIsFetchingMove({ payload: false }))

    }
    yield put(setIsFetchingMove({ payload: false }))
  }
}

function* makeComputerMove(action: any) {
  try {
    const { data: moveData } = yield call(makeApiRequest('/one/move/ai'), action.payload)
    const { from, to } = moveData
    const { data: checkData } = yield call(makeApiRequest('/one/check'), action.payload)
    const { status } = checkData
    yield put(makeFigureMove({ payload: { from, to, status } }))
  }
  catch {
    const message = {
      content: 'Oops. Check internet connection',
      status: MessageStatus.error,
    }
    yield put(setMessage({ payload: message }))
  }
}

function* getNewGameId(action: any) {
  yield put(setIsFetchingGameId({ payload: true }))
  const { gameMode } = action.payload
  const url = gameMode === GameMode.onePlayer ? '/one' : '/two'
  try {
    const { data: { game_id } } = yield call(axios$.get, url)
    yield put(startNewGame({ payload: game_id }))
  }
  catch {
    const message = { content: 'Problem with getting game id. Check you internet connection', status: MessageStatus.error }
    yield put(setMessage({ payload: message }))
  }
  yield put(setIsFetchingGameId({ payload: false }))
}

function* chessSaga() {
  yield takeLatest(makePlayerMoveApiRequest.type, makePlayerMove);
  yield takeLatest(makeComputerMoveApiRequest.type, makeComputerMove);
  yield takeLatest(startNewGameApiRequest.type, getNewGameId);
}

export default function* rootSaga() {
  yield all([
    chessSaga()
  ])
}

// Thunk actions currently not used

const undoLastMove = (dispatch: any) => {
  return dispatch((dispatch: any, getState: any) => {
    const game_id = getState().get('gameId')
    const gameMode = getState().get('gameMode')
    const url = gameMode === GameMode.onePlayer ? '/one/undo' : '/two/undo'
    axios$
      .post(url, {
        game_id,
      })
      .then(result => {
        const { status } = result.data
        if (status === "error: couldn't undo the move!") {
          const message = { content: "Couldn't undo the move", status: MessageStatus.error }
          dispatch(setMessage({ payload: message }))
        } else {
          dispatch(setLastGameSnapshot())
        }
      })
      .catch(error => {
        const message = { content: 'Problem with undo last move. Check you internet connection', status: MessageStatus.error }
        dispatch(setMessage({ payload: message }))
      })
  })
}

export {
  makeFigureMove,
  startNewGame,
  setGameMode,
  setFromCoordinates,
  forbiddenMove,
  makePlayerMoveApiRequest,
  makePlayerMove,
  setIsFetchingMove,
  setIsFetchingGameId,
  setMessage,
  getNewGameId,
  setNewGameModalOpened,
  setNewGameModalClosed,
  setLastGameSnapshot,
  startNewGameApiRequest,
  undoLastMove,
  rootSaga
}