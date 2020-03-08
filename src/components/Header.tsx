import React from 'react'
import styled from 'styled-components'
import { setNewGameModalOpened } from '../redux/actions'
import { connect } from 'react-redux'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem 0 2rem;
  height: 100%;
`

const Title = styled.div`
  color: #f4f4f4;
  text-transform: uppercase;
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: 30px;
`

const NewGameButton = styled.button`
  color: #fff;
  border-radius: 5px;
  background-color: transparent;
  border-color: transparent;
  padding: 0.1rem 0.2rem;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    color: #dfdfdf;
  }
`

function Header(props: { openNewGameModal: any }) {
  return (
    <Wrapper>
      <Title>Chess</Title>
      <NewGameButton onClick={props.openNewGameModal}>New Game</NewGameButton>
    </Wrapper>
  )
}

const mapDispatchToState = (dispatch: any) => {
  return {
    openNewGameModal: () => dispatch(setNewGameModalOpened())
  }
}

export default connect(null, mapDispatchToState)(Header)
