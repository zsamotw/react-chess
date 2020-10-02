import { createAction } from '@reduxjs/toolkit'
import axios from 'axios'
import MessageStatus from '../models/message-status.model'
import GameMode from '../models/game.mode'
import { call, put, takeEvery, takeLatest, select, all } from 'redux-saga/effects'
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

const makeMoveApiRequest = (url: string) => (data: { from: string, to: string, game_id: string }) => {
  return axios$.request({
    method: 'post',
    url: url,
    data
  });
}

const checkMoveApiRequest = (url: string) => (data: { game_id: string }) => {
  return axios$.request({
    method: 'post',
    url: url,
    data
  });
}

const computerMoveApiRequest = (url: string) => (data: { game_id: string }) => {
  return axios$.request({
    method: 'post',
    url: url,
    data 
  });
}

// Sagas
function* makePlayerMove(action: any) {
  const to = action.payload
  const from = yield select(getCurrentMoveStartingPoint)
  if (from !== to) {
    yield put(setIsFetchingMove({ payload: true }))
    const game_id = yield select(getGameId)
    const gameMode = yield select(getGameMode)
    const urlPostMove = gameMode === GameMode.onePlayer ? '/one/move/player' : '/two/move'
    const { data } = yield call(makeMoveApiRequest(urlPostMove), { from, to, game_id })
    if (data.status === 'error: invalid move!') {
      yield put(forbiddenMove())
    } else {
      const urlPostCheck = gameMode === GameMode.onePlayer ? '/one/check' : '/two/check'
      const { data } = yield call(checkMoveApiRequest(urlPostCheck), { game_id } )
      const { status } = data
      const isGameOver = yield select(getIsGameOver)
      yield put(makeFigureMove({ payload: { from, to, status } }))
      if (gameMode === GameMode.onePlayer && !isGameOver)
        yield put(makeComputerMoveApiRequest({payload: {game_id}}))
    }
  }
}

  function* makeComputerMove(action: any) {
    const { data } = yield call(computerMoveApiRequest('/one/move/ai'), action.payload)
    const { from, to } = data
    const { data: data2 }  = yield call(computerMoveApiRequest('/one/check'), action.payload)
    const { status } = data2
    yield put(makeFigureMove({payload: { from, to, status }}))
  }

  function* getNewGameId(action: any) {
    yield put(setIsFetchingGameId({ payload: true }))
    const url = action.payload === GameMode.onePlayer ? '/one' : '/two'
    const { data } = yield call(axios$.get, url)
    yield put(startNewGame({ payload: data.game_id }))
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

  // Thunk actions

  // const makePlayerMovet = (to: string, dispatch: any) => {
  //   return dispatch((dispatch: any, getState: any) => {
  //     const from = getState().get('currentMoveStartingPoint')

  //     if (from !== to) {
  //       dispatch(setIsFetchingMove({ payload: true }))
  //       const game_id = getState().get('gameId')
  //       const gameMode = getState().get('gameMode')
  //       const urlPostMove = gameMode === GameMode.onePlayer ? '/one/move/player' : '/two/move'
  //       axios$
  //         .post(
  //           urlPostMove,
  //           { from, to, game_id },
  //         )
  //         .then(result => {
  //           const { data } = result
  //           if (data.status === 'error: invalid move!') {
  //             dispatch(forbiddenMove())
  //           } else {
  //             const urlPostCheck = gameMode === GameMode.onePlayer ? '/one/check' : '/two/check'
  //             axios$
  //               .post(
  //                 urlPostCheck,
  //                 { game_id },
  //               )
  //               .then(result => {
  //                 const { status } = result.data
  //                 const isGameOver = getState().get('isGameOver')
  //                 dispatch(makeFigureMove({ payload: { from, to, status } }))
  //                 if (gameMode === GameMode.onePlayer && !isGameOver)
  //                   makeComputerMoveRequest(game_id)
  //               })
  //           }
  //         })
  //         .catch(error => {
  //           const message = { content: 'Oops. Check internet connection', status: MessageStatus.error }
  //           dispatch(setMessage({ payload: message }))
  //         })
  //         .then(() => dispatch(setIsFetchingMove({ payload: false })))
  //     }
  //   })
  // }

  // const makeComputerMovet = (dispatch: any, gameId: string) => {
  //   axios$
  //     .post('/one/move/ai', {
  //       game_id: gameId,
  //     })
  //     .then(moveResult => {
  //       const { from, to } = moveResult.data
  //       axios$
  //         .post('/one/check', {
  //           game_id: gameId,
  //         })
  //         .then(gameStatusResult => {
  //           const { status } = gameStatusResult.data
  //           dispatch(makeFigureMove({ payload: { from, to, status } }))
  //         })
  //     })
  //     .catch(error => {
  //       const message = {
  //         content: 'Oops. Check internet connection',
  //         status: MessageStatus.error,
  //       }
  //       dispatch(setMessage({ payload: message }))
  //     })
  // }

  // const getNewGameIdt = (dispatch: any, gameMode: GameMode) => {
  //   dispatch(setIsFetchingGameId({ payload: true }))
  //   const url = gameMode === GameMode.onePlayer ? '/one' : '/two'
  //   axios$
  //     .get(url)
  //     .then(result => {
  //       dispatch(startNewGame({ payload: result.data.game_id }))
  //     })
  //     .catch(error => {
  //       const message = { content: 'Problem with getting game id. Check you internet connection', status: MessageStatus.error }
  //       dispatch(setMessage({ payload: message }))
  //     })
  //     .then(() => dispatch(setIsFetchingGameId({ payload: false })))
  // }

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