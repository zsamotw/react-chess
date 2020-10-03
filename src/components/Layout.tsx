import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Board from './Board'
import GamePanel from './GamePanel'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const ContentWrapper = styled.div`
  display: flex;
  margin: 3rem auto;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`

export default function Layout() {
  return (
    <Container>
      <Header></Header>
      <ContentWrapper>
        <Board></Board>
        <GamePanel></GamePanel>
      </ContentWrapper>
    </Container>
  )
}
