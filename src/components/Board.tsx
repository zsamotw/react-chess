import React, { useEffect } from 'react'
import Rows from './Rows'
import GameState from '../models/store-model'
import {
  getBoard,
  getGameId,
  getMessage,
  getIsFetchingGameId,
  getIsNewGameModalOpened,
} from '../redux/selectors'
import { connect } from 'react-redux'
import { Board as BoardModel } from '../models/board-model'
import styled from 'styled-components'
import { Record } from 'immutable'
import Snackbar from '@material-ui/core/Snackbar'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import Message from '../models/message'
import Alert from './Alert'
import Color from '../models/color'
import GameDialog from './GameDialog'
import NewGameDialogContent from './NewGameDialogContent'

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const useStylesBackDrop = makeStyles(theme => ({
  backdrop: {
    opacity: 0.6,
    zIndex: 10000
  },
}))

const useStylesProgressBar = makeStyles(theme => ({
  root: {
    color: '#575757'
  },
}))

function Board(props: {
  board: BoardModel,
  message: Message,
  isGame: boolean,
  isFetchingGameId: boolean,
  activePlayerColor: Color,
  isNewGameModalOpened: boolean
}) {
  const { board, message, isGame, isFetchingGameId, isNewGameModalOpened } = props

  const [openSnackBar, setOpenSnackBar] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [openProgressBar, setOpenProgressBar] = React.useState(false)
  const [componentMessage, setComponentMessage] = React.useState({
    content: '',
    status: undefined,
  } as Message)

  const handleCloseSnackBar = (
    event?: React.SyntheticEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackBar(false)
  }

  type Severity = 'error' | 'warning' | 'info' | 'success' | undefined

  useEffect(() => {
    setOpenDialog(isNewGameModalOpened)
    setOpenProgressBar(isFetchingGameId)
    if (!!message.content && message !== componentMessage) {
      handleCloseSnackBar(undefined, '')
      setComponentMessage(message)
      setOpenSnackBar(true)
    }
  }, [message, componentMessage, isFetchingGameId, isNewGameModalOpened])

  const backDropStyles = useStylesBackDrop()
  const progressBarStyles = useStylesProgressBar()

  return (
    <BoardContainer>
      <Rows board={board} isGame={isGame} />
      <Backdrop className={backDropStyles.backdrop} open={openProgressBar}>
        <CircularProgress classes={progressBarStyles} />
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
          severity={componentMessage.status as Severity}>
          {componentMessage.content}
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

export default connect(mapStateToProps)(Board as any)
