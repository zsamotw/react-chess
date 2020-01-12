import GameState from '../models/store-model'
import { Record } from 'immutable'

const getBoard = (state: Record<GameState> & Readonly<GameState>) => {
  const rows = state.get('board')
  return { rows }
}

const getGameId = (state: Record<GameState> & Readonly<GameState>) => {
  const gameId = state.get('gameId')
  return { gameId }
}

export { getBoard, getGameId }
