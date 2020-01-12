import React from 'react'
import BoardView from './BoardView'
import GameState from '../models/store-model'
import { getBoard, getGameId } from '../redux/selectors'
import { connect } from 'react-redux'
import Board from '../models/board-model'
import MoveCoordinatesInput from './MoveCoordinatesInput'
import styled from 'styled-components'
import { makeMove } from '../redux/actions'
import { Record } from 'immutable'

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

const mapStateToProps = (state: Record<GameState> & Readonly<GameState>) => {
  const board = getBoard(state)
  const newGameId = getGameId(state)
  return { board, newGameId }
}

const mapDispatchToState = (dispatch: any) => {
  return {
    moveFigure: (coordinates: string) => {
      dispatch(makeMove({ payload: coordinates }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Content)
