import { createAction } from '@reduxjs/toolkit'
import axios from 'axios'

const newGame = createAction('New game', gameId => gameId)
const makePlayerMove = createAction('Make player move', coordinates => coordinates)
const handleForbiddenMove = createAction('Handle forbidden move')

const makeMovesSequence = (dispatch: any, getState: any, coordinates: string) => {
  const [from, to] = coordinates.split(' ')
  const game_id = getState().get('gameId')
  axios
    .post('http://chess-api-chess.herokuapp.com/api/v1/chess/one/move/player', {
      from,
      to,
      game_id
    })
    .then(result => {
      const toSend = { coordinates, result }
      dispatch(makePlayerMove({ payload: toSend }))
    })
}

export { makePlayerMove, newGame, handleForbiddenMove, makeMovesSequence }
