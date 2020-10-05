import { State } from '../models/state.model'


const getGameId = (state: State) => {
  const gameId = state.get('gameId')
  return  gameId 
}

const getGameMode = (state: State) => {
  const gameMode = state.get('gameMode')
  return  gameMode 
}

const getBoard = (state: State) => {
  const rows = state.get('board')
  return { rows }
}

const getActivePlayerColor = (state: State) => {
  const player = state.get('activePlayerColor')
  return player
}

const getMessage = (state: State) => {
  const message = state.get('message')
  return  message 
}

const getMoves = (state: State) => {
  const moves = state.get('moves')
  return  moves 
}

const getStatus = (state: State) => {
  const status = state.get('status')
  return status
}

const getIsGameOver = (state: State) => {
  const isGameOver = state.get('isGameOver')
  return isGameOver
}

const getIsFetchingGameId = (state: State) => {
  const fetchingData = state.get('fetchingData')
  return fetchingData.isFetchingGameId
}

const getIsFetchingMove = (state: State) => {
  const fetchingData = state.get('fetchingData')
  return fetchingData.isFetchingMove
}

const getCapturedFigures = (state: State) => {
  const capturedFigures = state.get('capturedFigures')
  return capturedFigures
}

const getIsNewGameModalOpened = (state: State) => {
  const isNewGameModalOpened = state.get('isNewGameModalOpened')
  return isNewGameModalOpened
}

const getCurrentMoveStartingPoint = (state: State) => {
  const currentMoveStartingPoint = state.get('currentMoveStartingPoint')
  return currentMoveStartingPoint 
}

export {
  getBoard,
  getGameId,
  getGameMode,
  getActivePlayerColor,
  getMessage,
  getMoves,
  getStatus,
  getIsGameOver,
  getIsFetchingGameId,
  getIsFetchingMove,
  getCapturedFigures,
  getIsNewGameModalOpened,
  getCurrentMoveStartingPoint
}
