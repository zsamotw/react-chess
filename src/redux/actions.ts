import { createAction } from '@reduxjs/toolkit'
import axios from 'axios'
import MessageStatus from '../models/message-status.model'
import GameMode from '../models/game.mode'

const axios$ = axios.create({
  baseURL: 'http://chess-api-chess.herokuapp.com/api/v1/chess'
})

// Actions

const startNewGame = createAction('New game', gameId => gameId)
const setGameMode = createAction('Set game mode', gameMode => gameMode)
const makeFigureMove = createAction('Make move', coordinates => coordinates)
const setFromCoordinates = createAction( 'Set from coordinates', coordinates => coordinates,)
const forbiddenMove = createAction('Forbidden move')
const setMessage = createAction('Set message', message => message)
const setIsFetchingMove = createAction( 'Set isFetchingMove', isFetching => isFetching,)
const setIsFetchingGameId = createAction( 'Set isFetchingGameId', isFetching => isFetching,)
const setNewGameModalOpened = createAction('Set new game modal opened')
const setNewGameModalClosed = createAction('Set new game modal closed')
const setLastGameSnapshot = createAction('Set last game snapshot')


// Thunk actions

const makePlayerMove = (to: string, dispatch: any) => {
  return dispatch((dispatch: any, getState: any) => {
    const from = getState().get('currentMoveStartingPoint')

    if (from !== to) {
      dispatch(setIsFetchingMove({ payload: true }))
      const game_id = getState().get('gameId')
      const gameMode = getState().get('gameMode')
      const urlPostMove = gameMode === GameMode.onePlayer ? '/one/move/player' : '/two/move'
      axios$
        .post(
          urlPostMove,
          { from, to, game_id },
        )
        .then(result => {
          const { data } = result
          if (data.status === 'error: invalid move!') {
            dispatch(forbiddenMove())
          } else {
            const urlPostCheck = gameMode === GameMode.onePlayer ? '/one/check' : '/two/check'
            axios$
              .post(
                urlPostCheck,
                { game_id },
              )
              .then(result => {
                const { status } = result.data
                const isGameOver = getState().get('isGameOver')
                dispatch(makeFigureMove({ payload: { from, to, status } }))
                if (gameMode === GameMode.onePlayer && !isGameOver)
                  makeComputerMove(dispatch, game_id)
              })
          }
        })
        .catch(error => {
          const message = { content: 'Oops. Check internet connection', status: MessageStatus.error }
          dispatch(setMessage({ payload: message }))
        })
        .then(() => dispatch(setIsFetchingMove({ payload: false })))
    }
  })
}

const makeComputerMove = (dispatch: any, gameId: string) => {
  axios$
    .post('/one/move/ai', {
      game_id: gameId,
    })
    .then(moveResult => {
      const { from, to } = moveResult.data
      axios$
        .post('/one/check', {
          game_id: gameId,
        })
        .then(gameStatusResult => {
          const { status } = gameStatusResult.data
          dispatch(makeFigureMove({ payload: { from, to, status } }))
        })
    })
    .catch(error => {
      const message = {
        content: 'Oops. Check internet connection',
        status: MessageStatus.error,
      }
      dispatch(setMessage({ payload: message }))
    })
}

const getNewGameId = (dispatch: any, gameMode: GameMode) => {
  dispatch(setIsFetchingGameId({ payload: true }))
  const url = gameMode === GameMode.onePlayer ? '/one' : '/two'
  axios$
    .get(url)
    .then(result => {
      dispatch(startNewGame({ payload: result.data.game_id }))
    })
    .catch(error => {
      const message = { content: 'Problem with getting game id. Check you internet connection', status: MessageStatus.error }
      dispatch(setMessage({ payload: message }))
    })
    .then(() => dispatch(setIsFetchingGameId({ payload: false })))
}

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
  makePlayerMove,
  setIsFetchingMove,
  setIsFetchingGameId,
  setMessage,
  getNewGameId,
  setNewGameModalOpened,
  setNewGameModalClosed,
  setLastGameSnapshot,
  undoLastMove,
}