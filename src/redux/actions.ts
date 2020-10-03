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
  makeComputerMoveApiRequest,
  setIsFetchingMove,
  setIsFetchingGameId,
  setMessage,
  setNewGameModalOpened,
  setNewGameModalClosed,
  setLastGameSnapshot,
  startNewGameApiRequest,
  undoLastMove,
}