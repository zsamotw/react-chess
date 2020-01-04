import Store from '../models/store-model'

const getBoard = (state: Store) => {
  const rows = state.board
  return { rows }
}

export { getBoard }
