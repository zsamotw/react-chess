import GameState from '../models/store-model'
import { Record } from 'immutable'


const getGameId = (state: Record<GameState> & Readonly<GameState>) => {
  const gameId = state.get('gameId')
  return  gameId 
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

const getIsGameOver = (state: Record<GameState> & Readonly<GameState>) => {
  const isGameOver = state.get('isGameOver')
  return isGameOver
}

const getIsFetchingGameId = (state: Record<GameState> & Readonly<GameState>) => {
  const fetchingData = state.get('fetchingData')
  return fetchingData.isFetchingGameId
}

const getHitFigures = (state: Record<GameState> & Readonly<GameState>) => {
  const hitFigures = state.get('hitFigures')
  return hitFigures
}


export { getBoard, getGameId, getActivePlayerColor, getMessage, getMoves, getIsGameOver, getIsFetchingGameId, getHitFigures }
