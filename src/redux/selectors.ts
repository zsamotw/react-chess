import GameState from '../models/store-model'

const getBoard = (state: GameState) => {
  const rows = state.board
  return { rows }
}

export { getBoard }
