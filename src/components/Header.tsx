import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
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

export default function Header() {
  return (
    <Wrapper>
      <Title>Chess</Title>
      <NewGameButton>New Game</NewGameButton>
    </Wrapper>
  )
}
