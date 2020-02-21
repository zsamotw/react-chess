import React from 'react'
import { DialogTitle } from '@material-ui/core'
import { connect } from 'react-redux'
import { setIsFetchingGameId, startNewGame, setMessage } from '../redux/actions'
import MessageStatus from '../models/message-status'
import axios from 'axios'
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
  border-color: #d0cccc;
  padding: 0.1rem 0.2rem;
  cursor: pointer;
  width: 50%;

  &:hover {
    background-color: #c4c4c4;
    border-color: #c4c4c4;
  }
`

function StartAppDialogContent(props: { getNewGame: any }) {
  const { getNewGame } = props

  return (
    <ContentContainer>
      <DialogTitle>Start new game</DialogTitle>
      <NewGameButton onClick={getNewGame}>New Game</NewGameButton>
    </ContentContainer>
  )
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

export default connect(null, mapDispatchToState)(StartAppDialogContent as any)
