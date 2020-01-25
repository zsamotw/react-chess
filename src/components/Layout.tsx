import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`
const HeaderWrapper = styled.header`
  height: 5%;
  background-color: #00b9f2;
`

const ContentWrapper = styled.div`
  height: 90%;
`

const FooterWrapper = styled.footer`
  height: 5%;
`

export default function Layout() {
  return (
    <Container>
      <HeaderWrapper>
        <Header></Header>
      </HeaderWrapper>
      <ContentWrapper>
        <Content></Content>
      </ContentWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Container>
  )
}
