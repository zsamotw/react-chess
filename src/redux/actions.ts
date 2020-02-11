import { createAction } from '@reduxjs/toolkit'
import axios from 'axios'

const newGame = createAction('New game', gameId => gameId)
const makeFigureMove = createAction( 'Make move', coordinates => coordinates)
const setFromCoordinates = createAction('Set from coordinates', coordinates => coordinates)
const forbiddenMove = createAction('Handle forbidden move')
const setMessage = createAction('Set message', message => message)
const setIsFetchingMove = createAction('Set isFetchingMove', isFetching => isFetching)
const setIsFetchingGameId = createAction('Set isFetchingNewGame', isFetching => isFetching)

const makePlayerMove = (to: string, dispatch: any) => {
  return dispatch((dispatch: any, getState: any) => {
    const game_id = getState().get('gameId')
    const from = getState().get('currentMoveStartingPoint')
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
          dispatch(makeFigureMove({ payload: { from, to } }))
        }
      })
      .catch(error =>
        dispatch(setMessage({ payload: 'Problem with making move' })),
      )
      .then(() => dispatch(setIsFetchingMove({ payload: false })))
  })
}

export {
  makeFigureMove,
  newGame,
  setFromCoordinates,
  forbiddenMove,
  makePlayerMove,
  setIsFetchingMove,
  setIsFetchingGameId,
  setMessage,
}
