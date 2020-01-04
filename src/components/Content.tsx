import React from 'react'
import BoardView from './BoardView'
import Store from '../models/store-model'
import { getBoard } from '../redux/selectors'
import { connect } from 'react-redux'
import Board from '../models/board-model'

function Content(props: { board: Board }) {
  const { board } = props
  return <BoardView board={board} />
}

const mapStateToProps = (state: Store) => {
  const board = getBoard(state)
  return { board }
}

export default connect(mapStateToProps)(Content)
