import MessageStatus from '../models/message-status.model'
import GameMode from '../models/game.mode'
import { call, put, takeLatest, select, all } from 'redux-saga/effects'
import { getGameId, getGameMode, getCurrentMoveStartingPoint, getIsGameOver } from './selectors'
import { setIsFetchingMove, forbiddenMove, makeFigureMove, setMessage, setIsFetchingGameId, startNewGame, makePlayerMoveApiRequest, makeComputerMoveApiRequest, startNewGameApiRequest, undoLastMoveApiRequest, setLastGameSnapshot } from './actions'
import { makeApiGetRequest, makeApiPostRequest } from '../helpers/api-helper'

function* makePlayerMove(action: any) {
  const { to } = action.payload
  const from = yield select(getCurrentMoveStartingPoint)
  if (from !== to) {
    yield put(setIsFetchingMove({ payload: {isFetchingMove: true} }))
    try {
      const game_id = yield select(getGameId)
      const gameMode = yield select(getGameMode)
      const urlPostMove = gameMode === GameMode.onePlayer ? '/one/move/player' : '/two/move'
      const { data } = yield call(makeApiPostRequest(urlPostMove), { from, to, game_id })

      if (data.status === 'error: invalid move!') {
        yield put(forbiddenMove())
      } else {
        const urlPostCheck = gameMode === GameMode.onePlayer ? '/one/check' : '/two/check'
        const { data } = yield call(makeApiPostRequest(urlPostCheck), { game_id })
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
      yield put(setMessage({ payload: {message} }))
      yield put(setIsFetchingMove({ payload: {isFetchingMove: false} }))

    }
    yield put(setIsFetchingMove({ payload: {isFetchingMove: false} }))
  }
}

function* makeComputerMove(action: any) {
  const game_id = action.payload
  try {
    const { data: moveData } = yield call(makeApiPostRequest('/one/move/ai'), game_id)
    const { from, to } = moveData
    const { data: checkData } = yield call(makeApiPostRequest('/one/check'), game_id)
    const { status } = checkData
    yield put(makeFigureMove({ payload: { from, to, status } }))
  }
  catch {
    const message = {
      content: 'Oops. Check internet connection',
      status: MessageStatus.error,
    }
    yield put(setMessage({ payload: {message} }))
  }
}

function* getNewGameId(action: any) {
  yield put(setIsFetchingGameId({ payload: {isFetchingGameId: true} }))
  const { gameMode } = action.payload
  const url = gameMode === GameMode.onePlayer ? '/one' : '/two'
  try {
    const { data: { game_id } } = yield call(makeApiGetRequest(), url)
    yield put(startNewGame({ payload: {game_id} }))
  }
  catch {
    const message = { content: 'Problem with getting game id. Check you internet connection', status: MessageStatus.error }
    yield put(setMessage({ payload: {message} }))
  }
  yield put(setIsFetchingGameId({ payload: {isFetchingGameId: false} }))
}

function* undoLastMove() {
  const game_id = yield select(getGameId)
  const gameMode = yield select(getGameMode)
  const url = gameMode === GameMode.onePlayer ? '/one/undo' : '/two/undo'
  try {
    const { data: { status } } = yield call(makeApiPostRequest(url), { game_id })
    if (status === "error: couldn't undo the move!") {
      const message = { content: "Couldn't undo the move", status: MessageStatus.error }
      yield put(setMessage({ payload: {message} }))
    } else {
      yield put(setLastGameSnapshot())
    }
  }
  catch {
    const message = { content: 'Problem with undo last move. Check you internet connection', status: MessageStatus.error }
    yield put(setMessage({ payload: {message} }))
  }
}

function* chessSaga() {
  yield takeLatest(makePlayerMoveApiRequest.type, makePlayerMove);
  yield takeLatest(makeComputerMoveApiRequest.type, makeComputerMove);
  yield takeLatest(startNewGameApiRequest.type, getNewGameId);
  yield takeLatest(undoLastMoveApiRequest.type, undoLastMove)
}

export default function* rootSaga() {
  yield all([
    chessSaga()
  ])
}
