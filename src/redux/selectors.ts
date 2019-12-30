import Store from '../models/Store'

const getBoard = (state: Store) => {
  const rows = state.board
  return { rows }
}

export { getBoard }
