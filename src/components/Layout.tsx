import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Board from './Board'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import GamePanel from './GamePanel'

const Container = styled.div`
  display: flex;
  flex-direction: column;
 `

const ContentWrapper = styled.div`
  margin: 3rem auto;
`

export default function Layout() {
  return (
    <DndProvider backend={Backend}>
      <Container>
          <Header></Header>
        <ContentWrapper>
          <Board></Board>
          <GamePanel></GamePanel>
        </ContentWrapper>
      </Container>
    </DndProvider>
  )
}
