import React from 'react'
import BoardView from './BoardView'
import GameState from '../models/store-model'
import {
  getBoard,
  getGameId,
  getMessage,
  getIsFetchingData,
} from '../redux/selectors'
import { connect } from 'react-redux'
import Board from '../models/board-model'
import styled from 'styled-components'
import { Record } from 'immutable'
import Snackbar from '@material-ui/core/Snackbar'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`

const useStyles = makeStyles(theme => ({
  backdrop: {
    opacity: 0.2,
  },
}));

function Content(props: { board: Board; message: string; gameId: string, isFetchingData: boolean }) {
  const { board, message, gameId, isFetchingData } = props
  const classes = useStyles()

  return (
    <BoardContainer>
      <BoardView board={board} gameId={gameId} />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={!!message}
        message={message}
        action={<React.Fragment></React.Fragment>}
      />
      <Backdrop className={classes.backdrop}  open={isFetchingData} >
        <CircularProgress/>
      </Backdrop>
    </BoardContainer>
  )
}

const mapStateToProps = (state: Record<GameState> & Readonly<GameState>) => {
  const board = getBoard(state)
  const gameId = getGameId(state)
  const message = getMessage(state)
  const isFetchingData = getIsFetchingData(state)
  return { board, gameId, message, isFetchingData }
}

export default connect(mapStateToProps, null)(Content as any)
