import React, { useEffect } from 'react'
import BoardView from './BoardView'
import GameState from '../models/store-model'
import {
  getBoard,
  getGameId,
  getMessage,
  getIsFetchingGameId,
  getActivePlayerColor,
} from '../redux/selectors'
import { connect } from 'react-redux'
import Board from '../models/board-model'
import styled from 'styled-components'
import { Record } from 'immutable'
import Snackbar from '@material-ui/core/Snackbar'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import Color from '../models/color'

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`

const ActivePlayerColor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 2rem;
  border-radius: 19px;
  border: 1px solid black;
  margin-bottom: 1rem;
`

const Player = styled.div`
  font-size: .7rem;
`

const useStyles = makeStyles(theme => ({
  backdrop: {
    opacity: 0.2,
  },
}))

function Content(props: {
  board: Board
  message: string
  gameId: string
  isFetchingGameId: boolean
  activePlayerColor: Color
}) {
  const { board, message, gameId, isFetchingGameId, activePlayerColor } = props

  const [openSnackBar, setOpenSnackBar] = React.useState(false)
  const [localMessage, setLocalMessage] = React.useState('')

  const handleCloseSnackBar = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackBar(false)
  }

  useEffect(() => {
    if (message !== localMessage) {
      handleCloseSnackBar(undefined, '')
      setLocalMessage(message)
      setOpenSnackBar(true)
    }
  }, [message, localMessage])

  const isWhitePlayer = activePlayerColor === Color.white

  const backDropClasses = useStyles()
  const activePlayerColorStyles = {
    opacity: !!gameId ? 1 : 0,
    backgroundColor: isWhitePlayer ? 'white' : 'black',
  }
  const playerStyle = {
    color: isWhitePlayer ? 'black' : 'white',
  }

  return (
    <BoardContainer>
      <ActivePlayerColor style={activePlayerColorStyles}>
        <Player style={playerStyle}>{isWhitePlayer ? 'White' : 'Black'}</Player>
      </ActivePlayerColor>
      <BoardView board={board} gameId={gameId} />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        message={localMessage}
        action={<React.Fragment></React.Fragment>}
      />
      <Backdrop className={backDropClasses.backdrop} open={isFetchingGameId}>
        <CircularProgress />
      </Backdrop>
    </BoardContainer>
  )
}

const mapStateToProps = (state: Record<GameState> & Readonly<GameState>) => {
  const board = getBoard(state)
  const gameId = getGameId(state)
  const message = getMessage(state)
  const isFetchingGameId = getIsFetchingGameId(state)
  const activePlayerColor = getActivePlayerColor(state)
  return { board, gameId, message, isFetchingGameId, activePlayerColor }
}

export default connect(mapStateToProps, null)(Content as any)
