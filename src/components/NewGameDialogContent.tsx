import React from 'react'
import { DialogTitle } from '@material-ui/core'
import { connect } from 'react-redux'
import { getNewGameId, setNewGameModalClosed } from '../redux/actions'
import styled from 'styled-components'

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
  justify-content:space-between;
`

const ModalButton = styled.button`
  border-radius: 5px;
  border-color: transparent;
  padding: 0.3rem 0.3rem;
  cursor: pointer;
`
const NewGameButton = styled(ModalButton)`
  background-color: #d0cccc; 
  margin-left: 2rem;

  &:hover {
    background-color: #9f9f9f;
  }
`
const CancelButton = styled(ModalButton)`
  background-color:#f4f4f4; 

  &:hover {
    background-color:#6c6b6b;
    color: white;
  }
`

function NewGameDialogContent(props: { getNewGame: any, closeModal: any }) {
  const { getNewGame, closeModal } = props

  const handleStartNewGame = () => {
    closeModal()
    getNewGame() 
  }

  return (
    <ContentContainer>
      <DialogTitle>Start new game</DialogTitle>
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
    closeModal: () => dispatch(setNewGameModalClosed())
  }
}

export default connect(null, mapDispatchToState)(NewGameDialogContent as any)
