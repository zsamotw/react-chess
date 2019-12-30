import React from 'react'
import styled from 'styled-components'
import Header from './Header'

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

export default function Layout() {
  return (
    <Container>
      <HeaderContainer>
        <Header></Header>
      </HeaderContainer>
      <ContentContainer>Content</ContentContainer>
      <FooterContainer>Footer</FooterContainer>
    </Container>
  )
}