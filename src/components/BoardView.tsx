import React from 'react'
import { List } from 'immutable'
import Field from '../models/field-model'
import Board from '../models/board-model'
import styled from 'styled-components'

type Row = List<Field>

const RowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  font-size: 1.2rem;
  padding: 0.5rem;
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

const FieldCoordinates = styled.div`
  position: absolute;
  top: 69%;
  left: 69%;
  font-size: 0.5rem
`
const FieldContent = styled.div``

type FirstFieldColor = 'white' | 'gray'

const rowStartsWith = (color: FirstFieldColor, row: Row, rowIndex: number) => {
  switch (color) {
    case 'white':
      return (
        <RowContainer key={rowIndex}>
          {row.map((f: Field) => {
            return (
              <FieldContainerStartsWithWhite key={f.coordinate}>
                <FieldContent key={f.coordinate}>
                  {f.figure.symbol}
                </FieldContent>
                <FieldCoordinates>{f.coordinate}</FieldCoordinates>
              </FieldContainerStartsWithWhite>
            )
          })}
        </RowContainer>
      )
    case 'gray':
      return (
        <RowContainer key={rowIndex}>
          {row.map((f: Field) => {
            return (
              <FieldContainerStartsWithGray key={f.coordinate}>
                <FieldContent key={f.coordinate}>
                  {f.figure.symbol}
                </FieldContent>
                <FieldCoordinates>{f.coordinate}</FieldCoordinates>
              </FieldContainerStartsWithGray>
            )
          })}
        </RowContainer>
      )
  }
}

export default function BoardView(props: {
  board: Board
}) {
  const { board } = props
  const isEven = (i: number) => i % 2 === 0

  return (
      <RowsContainer>
        {board.rows.map((row: Row, rowIndex: number) =>
          isEven(rowIndex)
            ? rowStartsWith('white', row, rowIndex)
            : rowStartsWith('gray', row, rowIndex)
        )}
      </RowsContainer>
  )
}
