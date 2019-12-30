import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import BoardView from './BoardView'
import Store from '../models/Store'
import { getBoard } from '../redux/selectors'
import { connect } from 'react-redux'
import Board from '../models/Board'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`
const HeaderContainer = styled.header`
  height: 10%;
  background-color: #00b9f2;
`

const ContentContainer = styled.div`
  height: 85%;
`

const FooterContainer = styled.footer`
  height: 5%;
`

function Layout(props: { board: Board }) {
  const { board } = props
  return (
    <Container>
      <HeaderContainer>
        <Header></Header>
      </HeaderContainer>
      <ContentContainer>
        <BoardView board={board} />
      </ContentContainer>
      <FooterContainer>Created by Tomasz</FooterContainer>
    </Container>
  )
}

const mapStateToProps = (state: Store) => {
  const board = getBoard(state)
  return { board }
}

export default connect(mapStateToProps)(Layout)
