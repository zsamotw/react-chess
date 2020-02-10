import GameState from '../models/store-model'
import { Record } from 'immutable'

const getBoard = (state: Record<GameState> & Readonly<GameState>) => {
  const rows = state.get('board')
  return { rows }
}

const getGameId = (state: Record<GameState> & Readonly<GameState>) => {
  const gameId = state.get('gameId')
  return  gameId 
}

const getMessage = (state: Record<GameState> & Readonly<GameState>) => {
  const message = state.get('message')
  return  message 
}

const getIsFetchingData = (state: Record<GameState> & Readonly<GameState>) => {
  const fetchingData = state.get('fetchingData')
  return fetchingData.isFetchingMove || fetchingData.isFetchingNewGame
}

export { getBoard, getGameId, getMessage, getIsFetchingData }
