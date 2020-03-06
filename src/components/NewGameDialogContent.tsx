import React from 'react'
import { DialogTitle, makeStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import { getNewGameId, setNewGameModalClosed } from '../redux/actions'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 12vh;
  padding: 2rem;
`

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ModalButton = styled.button`
  border-radius: 5px;
  border-color: transparent;
  padding: .3rem .5rem;
  cursor: pointer;
  text-transform: uppercase;
`
const NewGameButton = styled(ModalButton)`
  background-color: #dbdbdb;
  margin-left: 2rem;

  &:hover {
    background-color: #7d7c7c;
    color: #EEEDED;
  }
`
const CancelButton = styled(ModalButton)`
  background-color: #FFF;

  &:hover {
    background-color: rgb(245, 245, 245);
  }
`

const useStyles = makeStyles({
  iconButton: {
    right: '5px',
    top: '5px',
    position: 'absolute',
    padding: '6px'
  },
})

function NewGameDialogContent(props: { getNewGame: any; closeModal: any }) {
  const { getNewGame, closeModal } = props

  const handleStartNewGame = () => {
    closeModal()
    getNewGame()
  }

  const classes = useStyles();

  return (
    <ContentContainer>
      <DialogTitle>Start new game</DialogTitle>
      <IconButton aria-label='close' className={classes.iconButton} onClick={closeModal}>
        <CloseIcon />
      </IconButton>
      <ButtonsWrapper>
        <CancelButton onClick={closeModal}>Cancel</CancelButton>
        <NewGameButton onClick={handleStartNewGame}>New Game</NewGameButton>
      </ButtonsWrapper>
    </ContentContainer>
  )
}

const mapDispatchToState = (dispatch: any) => {
  return {
    getNewGame: () => getNewGameId(dispatch),
    closeModal: () => dispatch(setNewGameModalClosed()),
  }
}

export default connect(null, mapDispatchToState)(NewGameDialogContent as any)
