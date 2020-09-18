import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Board from './Board'
import { DndProvider } from 'react-dnd'
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'; // or any other pipeline
import GamePanel from './GamePanel'

const Container = styled.div`
  display: flex;
  flex-direction: column;
 `

const ContentWrapper = styled.div`
  display: flex;
  margin: 3rem auto;

  @media screen and (max-width: 1024px){
    flex-direction: column;
  }
`

export default function Layout() {

  return (
    <DndProvider backend={ MultiBackend } options={HTML5toTouch}>
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
