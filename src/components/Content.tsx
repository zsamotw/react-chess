import React from 'react'
import BoardView from './BoardView'
import GameState from '../models/store-model'
import { getBoard, getGameId } from '../redux/selectors'
import { connect } from 'react-redux'
import Board from '../models/board-model'
import MoveCoordinatesInput from './MoveCoordinatesInput'
import styled from 'styled-components'
import { makePlayerMove, handleForbiddenMove } from '../redux/actions'
import { Record } from 'immutable'
import axios from 'axios'

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
  const gameId = getGameId(state)
  return { board, gameId }
}

const mapDispatchToState = (dispatch: any) => {
  return {
    moveFigure: (coordinates: string) => {
      return dispatch((dispatch: any, getState: any) => {
        const [from, to] = coordinates.split(' ')
        const game_id = getState().get('gameId')
        axios
          .post(
            'http://chess-api-chess.herokuapp.com/api/v1/chess/one/move/player',
            { from, to, game_id }
          )
          .then(result => {
            debugger
            if (result.status === '') dispatch(handleForbiddenMove)
            else {
              const toSend = { coordinates, result }
              dispatch(makePlayerMove({ payload: toSend }))
            }
          })
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Content)
