import React, { useEffect } from 'react'
import Rows from './Rows'
import GameState from '../models/store-model'
import {
  getBoard,
  getGameId,
  getMessage,
  getIsFetchingGameId,
  getIsGameOver,
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
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { startNewGame, setIsFetchingGameId, setMessage } from '../redux/actions'
import axios from 'axios'
import MessageStatus from '../models/message-status'

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const NewGameButton = styled.button`
  color: white;
  border-radius: 5px;
  background-color: #db0a00;
  border-color: transparent;
  padding: 0.1rem 0.2rem;
  cursor: pointer;

  &:hover {
    background-color: #bd0900;
  }
`

const useStyles = makeStyles(theme => ({
  backdrop: {
    opacity: 0.6,
    zIndex: 10000
  },
}))

function Board(props: {
  board: BoardModel
  message: Message
  isGame: boolean
  isFetchingGameId: boolean
  activePlayerColor: Color
  isGameOver: boolean
  getNewGame: any
}) {
  const { board, message, isGame, isFetchingGameId, getNewGame } = props

  const [openSnackBar, setOpenSnackBar] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [openProgressBar, setOpenProgressBar] = React.useState(false)
  const [localMessage, setLocalMessage] = React.useState({
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
    setOpenDialog(!isGame && !isFetchingGameId)
    setOpenProgressBar(isFetchingGameId)
    if (!!message.content && message !== localMessage) {
      console.log(isFetchingGameId);
      handleCloseSnackBar(undefined, '')
      setLocalMessage(message)
      setOpenSnackBar(true)
    }
  }, [message, localMessage, isGame, isFetchingGameId])

  const backDropClasses = useStyles()

  return (
    <BoardContainer>
      <Rows board={board} isGame={isGame} />
      <Backdrop className={backDropClasses.backdrop} open={openProgressBar}>
        <CircularProgress />
      </Backdrop>
      <Dialog open={openDialog}>
        <DialogTitle>Start new game</DialogTitle>
        <NewGameButton onClick={getNewGame}>New Game</NewGameButton>
      </Dialog>
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
          severity={localMessage.status as Severity}>
          {localMessage.content}
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
  const isGameOver = getIsGameOver(state)
  const isGame = !!gameId && !isGameOver
  return { board, isGame, message, isFetchingGameId }
}

const mapDispatchToState = (dispatch: any) => {
  return {
    getNewGame: () => {
      dispatch(setIsFetchingGameId({ payload: true }))
      axios
        .get('http://chess-api-chess.herokuapp.com/api/v1/chess/one')
        .then(result => {
          dispatch(startNewGame({ payload: result.data.game_id }))
        })
        .catch(error => {
          const message = {
            content:
              'Problem with getting game id. Check you internet connection',
            status: MessageStatus.error,
          }
          dispatch(setMessage({ payload: message }))
        })
        .then(() => dispatch(setIsFetchingGameId({ payload: false })))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Board as any)
