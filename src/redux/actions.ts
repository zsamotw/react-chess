import { createAction } from '@reduxjs/toolkit'
import axios from 'axios'

const newGame = createAction('New game', gameId => gameId)
const makeFigureMove = createAction( 'Make move', coordinates => coordinates)
const setFromCoordinate = createAction('Set from coordinate', coordinates => coordinates)
const forbiddenMove = createAction('Handle forbidden move')

const makePlayerMove = (to: string, dispatch: any) => {
  return dispatch((dispatch: any, getState: any) => {
    const game_id = getState().get('gameId')
    const from = getState().get('fromCoordinate')
    axios
      .post(
        'http://chess-api-chess.herokuapp.com/api/v1/chess/one/move/player',
        { from, to, game_id }
      )
      .then(result => {
        const { data } = result
        if (data.status === 'error: invalid move!') {
          dispatch(forbiddenMove())
        } 
        else {
          dispatch(makeFigureMove({ payload: {from, to} }))
        }
      })
  })
}

export { makeFigureMove , newGame, setFromCoordinate, forbiddenMove, makePlayerMove }
