import React, { useEffect, useState } from 'react'
import Rows from './Rows'
import GameState from '../models/store.model'
import {
  getBoard,
  getGameId,
  getMessage,
  getIsFetchingGameId,
  getIsNewGameModalOpened,
} from '../redux/selectors'
import { connect } from 'react-redux'
import { Board as BoardModel } from '../models/board.model'
import styled from 'styled-components'
import { Record } from 'immutable'
import Snackbar from '@material-ui/core/Snackbar'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import Message from '../models/message.model'
import Alert from './Alert'
import Color from '../models/color.model'
import GameDialog from './GameDialog'
import NewGameDialogContent from './NewGameDialogContent'
import { setMessage } from '../redux/actions'

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const useStyles = makeStyles({
  backdrop: {
    opacity: 0.6,
    zIndex: 10000
  }
})

const useStylesProgressBar = makeStyles({
  root: {
    color: '#575757'
  }
})

function Board(props: {
  board: BoardModel,
  message: Message,
  isGame: boolean,
  isFetchingGameId: boolean,
  activePlayerColor: Color,
  isNewGameModalOpened: boolean,
  setGameMessage: any
}) {
  const { board, message, isGame, isFetchingGameId, isNewGameModalOpened, setGameMessage } = props

  const [openSnackBar, setOpenSnackBar] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [openProgressBar, setOpenProgressBar] = useState(false)

  const handleCloseSnackBar = (
    event?: React.SyntheticEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackBar(false)
    setGameMessage({content: '', status: message.status })
  }

  type Severity = 'error' | 'warning' | 'info' | 'success' | undefined

  useEffect(() => {
    setOpenDialog(isNewGameModalOpened)
    setOpenProgressBar(isFetchingGameId)
    if (!!message.content) {
      setOpenSnackBar(true)
    } else {
      setOpenSnackBar(false)
    }
  }, [message, isFetchingGameId, isNewGameModalOpened])

  const classes = useStyles()
  const classesProgressBar= useStylesProgressBar()

  return (
    <BoardContainer>
      <Rows board={board} isGame={isGame} />
      <Backdrop className={classes.backdrop} open={openProgressBar}>
        <CircularProgress classes={classesProgressBar} />
      </Backdrop>
      <GameDialog open={openDialog}>
        <NewGameDialogContent></NewGameDialogContent>
      </GameDialog>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}>
        <Alert
          onClose={handleCloseSnackBar}
          severity={message.status as Severity}>
          {message.content}
        </Alert>
      </Snackbar>
    </BoardContainer>
  )
}

const mapStateToProps = (state: Record<GameState> & Readonly<GameState>) => {
  const board = getBoard(state)
  const gameId = getGameId(state)
  const message = getMessage(state)
  const isFetchingGameId = getIsFetchingGameId(state)
  const isGame = !!gameId
  const isNewGameModalOpened = getIsNewGameModalOpened(state)
  return { board, isGame, message, isFetchingGameId, isNewGameModalOpened }
}

const mapDispatchToState = (dispatch: any) => {
  return {
    setGameMessage: (message: Message) => dispatch(setMessage({payload:  message }))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Board as any)
