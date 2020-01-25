import React from 'react'
import BoardView from './BoardView'
import GameState from '../models/store-model'
import { getBoard, getGameId, getMessage } from '../redux/selectors'
import { connect } from 'react-redux'
import Board from '../models/board-model'
import MoveCoordinatesInput from './MoveCoordinatesInput'
import styled from 'styled-components'
import { makePlayerMove } from '../redux/actions'
import { Record } from 'immutable'

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`

const MessageBox = styled.div`
  padding: 1rem 1rem;
  font-size: 1rem;
  margin: 1rem 0 1rem;
`

function Content(props: {
  board: Board
  playerMove: any
  message: string
  gameId: string
}) {
  const { board, message, gameId } = props
  const handleEnterCoordinates = (coordinates: string) => {
    props.playerMove(coordinates)
  }

  return (
    <BoardContainer>
      <BoardView board={board} />
      <MessageBox>{message}</MessageBox>
      <MoveCoordinatesInput
        onPressEnter={moveCoordinates => handleEnterCoordinates(moveCoordinates)}
        disabled={!gameId}
      />
    </BoardContainer>
  )
}

const mapStateToProps = (state: Record<GameState> & Readonly<GameState>) => {
  const board = getBoard(state)
  const gameId = getGameId(state)
  const message = getMessage(state)
  return { board, gameId, message }
}

const mapDispatchToState = (dispatch: any) => {
  return {
    playerMove: (coordinates: string) => makePlayerMove(coordinates, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Content as any)
