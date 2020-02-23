import React from 'react'
import { DialogTitle } from '@material-ui/core'
import { connect } from 'react-redux'
import { getNewGameId, setNewGameModalClosed } from '../redux/actions'
import styled from 'styled-components'

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`

const NewGameButton = styled.button`
  border-radius: 5px;
  background-color: #d0cccc; 
  border-color: transparent;
  padding: 0.1rem 0.2rem;
  cursor: pointer;
  width: 50%;

  &:hover {
    background-color: #c4c4c4;
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
      <NewGameButton onClick={handleStartNewGame}>New Game</NewGameButton>
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
