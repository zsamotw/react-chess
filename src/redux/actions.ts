import { createAction } from '@reduxjs/toolkit'
import axios from 'axios'

const newGame = createAction('New game', gameId => gameId)
const makeMove = createAction(
  'Make move',
  coordinates => coordinates
)
const forbiddenMove = createAction('Handle forbidden move')

const makePlayerMove = (coordinates: string, dispatch: any) => {
  return dispatch((dispatch: any, getState: any) => {
    const [from, to] = coordinates.split(' ')
    const game_id = getState().get('gameId')
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
          dispatch(makeMove({ payload: {coordinates} }))
        }
      })
  })
}

export { makeMove, newGame, forbiddenMove, makePlayerMove }
