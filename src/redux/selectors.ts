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

const getIsFetchingGameId = (state: Record<GameState> & Readonly<GameState>) => {
  const fetchingData = state.get('fetchingData')
  return fetchingData.isFetchingGameId
}

export { getBoard, getGameId, getActivePlayerColor, getMessage, getIsFetchingGameId }
