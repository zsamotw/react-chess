import React from 'react'
import styled from 'styled-components'
import { setNewGameModalOpened } from '../redux/actions'
import { connect } from 'react-redux'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .5rem 2rem;
  background-color: ${props => props.theme.background.black};
`

const Title = styled.div`
  color: ${props => props.theme.secondary.main};
  text-transform: uppercase;
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: 12px;
`

const ButtonNewGame = styled.button`
  color: ${props => props.theme.secondary.main};
  border-radius: 5px;
  background-color: transparent;
  border-color: transparent;
  padding: 0.1rem 0.2rem;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    color: ${props => props.theme.secondary.dark};
  }
`

function Header(props: { openNewGameModal: any }) {
  return (
    <Wrapper>
      <Title>Chess</Title>
      <ButtonNewGame onClick={props.openNewGameModal}>New Game</ButtonNewGame>
    </Wrapper>
  )
}

const mapDispatchToState = (dispatch: any) => {
  return {
    openNewGameModal: () => dispatch(setNewGameModalOpened())
  }
}

export default connect(null, mapDispatchToState)(Header)
