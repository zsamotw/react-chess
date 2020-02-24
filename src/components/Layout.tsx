import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Board from './Board'
import Footer from './Footer'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import GamePanel from './GamePanel'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`
const HeaderWrapper = styled.header`
  height: 3vh;
  background-color: #1e1d1b;
`

const ContentWrapper = styled.div`
  height: 92vh;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 3rem;
`

const FooterWrapper = styled.footer`
  height: 5vh;
  background-color: #f0f0f0;
`

export default function Layout() {
  return (
    <DndProvider backend={Backend}>
      <Container>
        <HeaderWrapper>
          <Header></Header>
        </HeaderWrapper>
        <ContentWrapper>
          <Board></Board>
          <GamePanel></GamePanel>
        </ContentWrapper>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Container>
    </DndProvider>
  )
}
