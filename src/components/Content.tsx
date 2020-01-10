import React from 'react'
import BoardView from './BoardView'
import Store from '../models/store-model'
import { getBoard } from '../redux/selectors'
import { connect } from 'react-redux'
import Board from '../models/board-model'
import MoveCoordinatesInput from './MoveCoordinatesInput'
import styled from 'styled-components'
import { makeMove } from '../redux/actions'

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`

function Content(props: { board: Board; moveFigure: any }) {
  const { board } = props
  const handleMoveCoordinates = (moveCoordinates: string) => {
    props.moveFigure(moveCoordinates)
  }

  return (
    <BoardContainer>
      <BoardView board={board} />
      <MoveCoordinatesInput
        onPressEnter={moveCoordinates => handleMoveCoordinates(moveCoordinates)}
      />
    </BoardContainer>
  )
}

const mapStateToProps = (state: Store) => {
  const board = getBoard(state)
  return { board }
}

const mapDispatchToState = (dispatch: any) => {
  return {
    moveFigure: (coordinates: string) => {
      dispatch(makeMove({ payload: coordinates }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Content)
