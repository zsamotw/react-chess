import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-end;
`

const AuthorInfo = styled.div`
  padding: 1rem 1rem;
`

export default function Footer() {
  return (
    <Wrapper>
      <AuthorInfo>Created by Tomasz</AuthorInfo>
    </Wrapper>
  )
}
