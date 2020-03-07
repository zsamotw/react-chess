import React from 'react'
import { DialogTitle, makeStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import {
  getNewGameId,
  setNewGameModalClosed,
  setGameMode,
} from '../redux/actions'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Radio from '@material-ui/core/Radio'
import { getGameMode } from '../redux/selectors'
import GameState from '../models/store-model'
import { Record } from 'immutable'
import GameMode from '../models/game-mode'

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 15vh;
  padding: 2rem;
`

const GameModeRadio = styled.div``

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`

const ModalButton = styled.button`
  border-radius: 5px;
  border-color: transparent;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
`
const NewGameButton = styled(ModalButton)`
  background-color: #dbdbdb;
  margin-left: 2rem;

  &:hover {
    background-color: #7d7c7c;
    color: #eeeded;
  }
`
const CancelButton = styled(ModalButton)`
  background-color: #fff;

  &:hover {
    background-color: rgb(245, 245, 245);
  }
`

const useStyles = makeStyles({
  iconButton: {
    right: '5px',
    top: '5px',
    position: 'absolute',
    padding: '6px',
  },
})

function NewGameDialogContent(props: {
  getNewGame: any
  closeModal: any
  gameMode: GameMode
  setOnePlayerMode: any
  setTwoPlayersMode: any
}) {
  const {
    getNewGame,
    closeModal,
    gameMode,
    setOnePlayerMode,
    setTwoPlayersMode,
  } = props

  const handleStartNewGame = () => {
    closeModal()
    getNewGame(gameMode)
  }

  const classes = useStyles()

  return (
    <ContentContainer>
      <DialogTitle>Start new game</DialogTitle>
      <IconButton
        aria-label='close'
        className={classes.iconButton}
        onClick={closeModal}>
        <CloseIcon />
      </IconButton>
      <GameModeRadio>
        <label>{GameMode.onePlayer}</label>
        <Radio
          checked={gameMode === GameMode.onePlayer}
          onChange={setOnePlayerMode}
          value='One player'
          name='radio-one-player'
          size='small'
        />
        <Radio
          checked={gameMode === GameMode.twoPlayers}
          onChange={setTwoPlayersMode}
          value='Two players'
          name='radio-two-players'
          size='small'
        />
        <label>{GameMode.twoPlayers}</label>
      </GameModeRadio>
      <ButtonsWrapper>
        <CancelButton onClick={closeModal}>Cancel</CancelButton>
        <NewGameButton onClick={handleStartNewGame}>New Game</NewGameButton>
      </ButtonsWrapper>
    </ContentContainer>
  )
}

const mapStateToProps = (state: Record<GameState> & Readonly<GameState>) => {
  const gameMode = getGameMode(state)
  return { gameMode }
}

const mapDispatchToState = (dispatch: any) => {
  return {
    getNewGame: (gameMode: GameMode) => getNewGameId(dispatch, gameMode),
    closeModal: () => dispatch(setNewGameModalClosed()),
    setOnePlayerMode: () => dispatch(setGameMode({ payload: GameMode.onePlayer })),
    setTwoPlayersMode: () => dispatch(setGameMode({ payload: GameMode.twoPlayers })),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToState,
)(NewGameDialogContent as any)
