import React from 'react'
import BoardView from './BoardView'
import GameState from '../models/store-model'
import { getBoard, getGameId, getMessage } from '../redux/selectors'
import { connect } from 'react-redux'
import Board from '../models/board-model'
import styled from 'styled-components'
import { Record } from 'immutable'
import Snackbar from '@material-ui/core/Snackbar'

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`

function Content(props: { board: Board; message: string; gameId: string }) {
  const { board, message, gameId } = props

  return (
    <BoardContainer>
      <BoardView board={board} gameId={gameId} />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={!!message}
        message={message}
        action={
          <React.Fragment>
          </React.Fragment>
        }
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

export default connect(mapStateToProps, null)(Content as any)
