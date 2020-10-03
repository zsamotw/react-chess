import GameState from '../models/store.model'
import { Record } from 'immutable'


const getGameId = (state: Record<GameState> & Readonly<GameState>) => {
  const gameId = state.get('gameId')
  return  gameId 
}

const getGameMode = (state: Record<GameState> & Readonly<GameState>) => {
  const gameMode = state.get('gameMode')
  return  gameMode 
}

const getBoard = (state: Record<GameState> & Readonly<GameState>) => {
  const rows = state.get('board')
  return { rows }
}

const getActivePlayerColor = (state: Record<GameState> & Readonly<GameState>) => {
  const player = state.get('activePlayerColor')
  return player
}

const getMessage = (state: Record<GameState> & Readonly<GameState>) => {
  const message = state.get('message')
  return  message 
}

const getMoves = (state: Record<GameState> & Readonly<GameState>) => {
  const moves = state.get('moves')
  return  moves 
}

const getStatus = (state: Record<GameState> & Readonly<GameState>) => {
  const status = state.get('status')
  return status
}

const getIsGameOver = (state: Record<GameState> & Readonly<GameState>) => {
  const isGameOver = state.get('isGameOver')
  return isGameOver
}

const getIsFetchingGameId = (state: Record<GameState> & Readonly<GameState>) => {
  const fetchingData = state.get('fetchingData')
  return fetchingData.isFetchingGameId
}

const getIsFetchingMove = (state: Record<GameState> & Readonly<GameState>) => {
  const fetchingData = state.get('fetchingData')
  return fetchingData.isFetchingMove
}

const getCapturedFigures = (state: Record<GameState> & Readonly<GameState>) => {
  const capturedFigures = state.get('capturedFigures')
  return capturedFigures
}

const getIsNewGameModalOpened = (state: Record<GameState> & Readonly<GameState>) => {
  const isNewGameModalOpened = state.get('isNewGameModalOpened')
  return isNewGameModalOpened
}

const getCurrentMoveStartingPoint = (state: Record<GameState> & Readonly<GameState>) => {
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
