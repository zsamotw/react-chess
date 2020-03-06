import { createAction } from '@reduxjs/toolkit'
import axios from 'axios'
import MessageStatus from '../models/message-status'

const startNewGame = createAction('New game', gameId => gameId)
const makeFigureMove = createAction('Make move', coordinates => coordinates)
const setFromCoordinates = createAction( 'Set from coordinates', coordinates => coordinates,)
const forbiddenMove = createAction('Forbidden move')
const setMessage = createAction('Set message', message => message)
const setIsFetchingMove = createAction( 'Set isFetchingMove', isFetching => isFetching,)
const setIsFetchingGameId = createAction( 'Set isFetchingGameId', isFetching => isFetching,)
const setNewGameModalOpened = createAction('Set new game modal opened')
const setNewGameModalClosed = createAction('Set new game modal closed')
const setLastGameSnapshot = createAction('Set last game snapshot')

const makePlayerMove = (to: string, dispatch: any) => {
  return dispatch((dispatch: any, getState: any) => {
    const game_id = getState().get('gameId')
    const from = getState().get('currentMoveStartingPoint')
    if (from !== to) {
      dispatch(setIsFetchingMove({ payload: true }))
      axios
        .post(
          'http://chess-api-chess.herokuapp.com/api/v1/chess/one/move/player',
          { from, to, game_id },
        )
        .then(result => {
          const { data } = result
          if (data.status === 'error: invalid move!') {
            dispatch(forbiddenMove())
          } else {
            axios
              .post(
                'http://chess-api-chess.herokuapp.com/api/v1/chess/two/check',
                { game_id },
              )
              .then(result => {
                const { status } = result.data
                dispatch(makeFigureMove({ payload: { from, to, status } }))
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

const getNewGameId = (dispatch: any) => {
  dispatch(setIsFetchingGameId({ payload: true }))
  axios
    .get('http://chess-api-chess.herokuapp.com/api/v1/chess/one')
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
    debugger
    const game_id = getState().get('gameId')
    axios
      .post('http://chess-api-chess.herokuapp.com/api/v1/chess/two/undo', {
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
