import React from 'react'
import { DialogTitle, makeStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import {
  setNewGameModalClosed,
  setGameMode,
  startNewGameApiRequest
} from '../redux/actions'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Radio from '@material-ui/core/Radio'
import { getGameMode, getGameId } from '../redux/selectors'
import GameMode from '../models/game.mode'
import { State } from '../models/state.model'

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-height: 50vh;
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
const NewGameButton = styled(ModalButton as any)`
  background-color: ${props => props.theme.secondary.dark};

  &:hover {
    background-color: ${props => props.theme.primary.light};
    color: ${props => props.theme.secondary.main};
  }
`
const CancelButton = styled(ModalButton as any)`
  background-color: ${props => props.theme.background.white};
  margin-right: 2rem;

  &:hover {
    background-color: ${props => props.theme.secondary.main};
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
  getNewGame: any,
  closeModal: any,
  gameMode: GameMode,
  canCloseModal: boolean,
  setOnePlayerMode: any,
  setTwoPlayersMode: any,
}) {
  const {
    getNewGame,
    closeModal,
    gameMode,
    canCloseModal,
    setOnePlayerMode,
    setTwoPlayersMode,
  } = props
  const handleStartNewGame = () => {
    closeModal()
    getNewGame(gameMode)
  }

  const classes = useStyles()

  const closeIcon =
    <IconButton
      aria-label='close'
      className={classes.iconButton}
      onClick={closeModal}>
      <CloseIcon />
    </IconButton>

  const closeButton = <CancelButton onClick={closeModal}>Cancel</CancelButton>

  return (
    <ContentContainer>
      <DialogTitle>Start new game</DialogTitle>
      {canCloseModal && closeIcon }
      <GameModeRadio>
        <label>{GameMode.onePlayer}</label>
        <Radio
          checked={gameMode === GameMode.onePlayer}
          onChange={setOnePlayerMode}
          value='One player'
          name='radio-one-player'
          color="default"
          size='small'
        />
        <Radio
          checked={gameMode === GameMode.twoPlayers}
          onChange={setTwoPlayersMode}
          value='Two players'
          name='radio-two-players'
          color="default"
          size='small'
        />
        <label>{GameMode.twoPlayers}</label>
      </GameModeRadio>
      <ButtonsWrapper>
        {canCloseModal && closeButton }
        <NewGameButton onClick={handleStartNewGame}>New Game</NewGameButton>
      </ButtonsWrapper>
    </ContentContainer>
  )
}

const mapStateToProps = (state: State) => {
  const gameMode = getGameMode(state)
  const canCloseModal = !!getGameId(state)
  return { gameMode, canCloseModal }
}

const mapDispatchToState = (dispatch: any) => {
  return {
    getNewGame: (gameMode: GameMode) => dispatch(startNewGameApiRequest({payload: {gameMode}})),
    closeModal: () => dispatch(setNewGameModalClosed()),
    setOnePlayerMode: () => dispatch(setGameMode({ payload: {gameMode: GameMode.onePlayer} })),
    setTwoPlayersMode: () => dispatch(setGameMode({ payload: {gameMode: GameMode.twoPlayers} })),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToState,
)(NewGameDialogContent as any)
