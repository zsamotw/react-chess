import React from 'react'
import { List } from 'immutable'
import Field from '../models/Field'
import Board from '../models/Board'
import styled from 'styled-components'

type Row = List<Field>

const RowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-left: 1px solid black;
  border-right: 1px solid black;

  &:first-child {
    border-top: 1px solid black;
  }

  &:last-child {
    border-bottom: 1px solid black;
  }
`

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1rem;
  width: 1rem;
  padding: 0.5rem;
  /* border: 1px solid black; */
`
const FieldContainerStartsWithWhite = styled(FieldContainer)`
  &:nth-child(even) {
    background-color: gray;
  }
`
const FieldContainerStartsWithGray = styled(FieldContainer)`
  &:nth-child(odd) {
    background-color: gray;
  }
`

const FieldContent = styled.div``

export default function BoardView(props: { board: Board }) {
  const { board } = props
  const isEven = (i: number) => i % 2 === 0

  return (
    <RowsContainer>
      {board.rows.map((r: Row, ri: number) => {
        return isEven(ri) ? (
          <RowContainer>
            {r.map((f: Field) => {
              return (
                <FieldContainerStartsWithWhite>
                  <FieldContent>{f.figure.symbol}</FieldContent>
                </FieldContainerStartsWithWhite>
              )
            })}
          </RowContainer>
        ) : (
          <RowContainer>
            {r.map((f: Field) => {
              return (
                <FieldContainerStartsWithGray>
                  <FieldContent>{f.figure.symbol}</FieldContent>
                </FieldContainerStartsWithGray>
              )
            })}
          </RowContainer>
        )
      })}
    </RowsContainer>
  )
}
