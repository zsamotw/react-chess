import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
`

const AuthorInfo = styled.div`
  padding: 1rem 1rem;
`

export default function Footer() {
  return (
    <Wrapper>
      <AuthorInfo>Created by Tomasz. Powered by <a href="https://github.com/anzemur/chess-api">Chess API</a></AuthorInfo>
    </Wrapper>
  )
}
