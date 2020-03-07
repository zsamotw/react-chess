import { createAction } from '@reduxjs/toolkit'
import axios from 'axios'
import MessageStatus from '../models/message-status'
import GameMode from '../models/game-mode'

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

const makePlayerMove = (to: string, dispatch: any) => {
  return dispatch((dispatch: any, getState: any) => {
    const from = getState().get('currentMoveStartingPoint')

    if (from !== to) {
      dispatch(setIsFetchingMove({ payload: true }))
      const game_id = getState().get('gameId')
      const gameMode = getState().get('gameMode')
      const urlPostMove = gameMode === GameMode.onePlayer ? 'http://chess-api-chess.herokuapp.com/api/v1/chess/one/move/player' : 'http://chess-api-chess.herokuapp.com/api/v1/chess/two/move'
      axios
        .post(
          urlPostMove,
          { from, to, game_id },
        )
        .then(result => {
          const { data } = result
          if (data.status === 'error: invalid move!') {
            dispatch(forbiddenMove())
          } else {
            const urlPostCheck = gameMode === GameMode.onePlayer ? 'http://chess-api-chess.herokuapp.com/api/v1/chess/one/check' : 'http://chess-api-chess.herokuapp.com/api/v1/chess/two/check'
            axios
              .post(
                urlPostCheck,
                { game_id },
              )
              .then(result => {
                const { status } = result.data
                dispatch(makeFigureMove({ payload: { from, to, status } }))
                if (gameMode === GameMode.onePlayer)
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
  axios
    .post('http://chess-api-chess.herokuapp.com/api/v1/chess/one/move/ai', {
      game_id: gameId,
    })
    .then(moveResult => {
      const { from, to } = moveResult.data
      axios
        .post('http://chess-api-chess.herokuapp.com/api/v1/chess/one/check', {
          game_od: gameId,
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
  const url = gameMode === GameMode.onePlayer ? 'http://chess-api-chess.herokuapp.com/api/v1/chess/one' : 'http://chess-api-chess.herokuapp.com/api/v1/chess/two'
  axios
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
    const url = gameMode === GameMode.onePlayer ? 'http://chess-api-chess.herokuapp.com/api/v1/chess/one/undo' : 'http://chess-api-chess.herokuapp.com/api/v1/chess/two/undo'
    axios
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