import React from 'react'
import styled from 'styled-components'
import { newGame } from '../redux/actions'
import { connect } from 'react-redux'
import axios from 'axios'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem 0 2rem;
  height: 100%;
`

const Title = styled.div`
  text-transform: uppercase;
  font-size: 2rem;
`

const NewGameButton = styled.button`
  color: white;
  border-radius: 5px;
  background-color: #db0a00;
  border-color: transparent;
  padding: 0.1rem 0.2rem;
  cursor: pointer;
`

function Header(props: { getNewGame: any }) {
  return (
    <Wrapper>
      <Title>Chess</Title>
      <NewGameButton onClick={props.getNewGame}>New Game</NewGameButton>
    </Wrapper>
  )
}

const mapDispatchToState = (dispatch: any) => {
  return {
    getNewGame: () => {
      axios
        .get('http://chess-api-chess.herokuapp.com/api/v1/chess/one')
        .then(res => dispatch(newGame({ payload: res.data.game_id })))
    }
  }
}

export default connect(null, mapDispatchToState)(Header)
