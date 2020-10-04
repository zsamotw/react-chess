import { createAction } from '@reduxjs/toolkit'

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

const makePlayerMoveApiRequest = createAction('Make player move api request', to => to)
const makeComputerMoveApiRequest = createAction('Make computer move api request', game_id => game_id)
const startNewGameApiRequest = createAction('Start new game api request', gameMode => gameMode)
const undoLastMoveApiRequest = createAction('Undo last move api request')

export {
  makeFigureMove,
  startNewGame,
  setGameMode,
  setFromCoordinates,
  forbiddenMove,
  makePlayerMoveApiRequest,
  makeComputerMoveApiRequest,
  undoLastMoveApiRequest,
  setIsFetchingMove,
  setIsFetchingGameId,
  setMessage,
  setNewGameModalOpened,
  setNewGameModalClosed,
  setLastGameSnapshot,
  startNewGameApiRequest,
}