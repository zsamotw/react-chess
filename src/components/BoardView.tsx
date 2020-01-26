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

const Row = styled.div`
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

const FieldGeneric = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  font-size: 1.2rem;
  padding: 0.5rem;
`
const FieldEachEvenGrey = styled(FieldGeneric)`
  &:nth-child(even) {
    background-color: #c8c4c4;
  }
`
const FieldEachOddGrey = styled(FieldGeneric)`
  &:nth-child(odd) {
    background-color: #c8c4c4;
  }
`

const FieldCoordinates = styled.div`
  position: absolute;
  top: 69%;
  left: 69%;
  font-size: 0.5rem;
  color: #716f6f;
`

const FieldContent = styled.div``

type FieldColor = 'white' | 'gray'

const rowStartsWith = (firstFieldColorInRow: FieldColor, row: Row, rowIndex: number) => {
  switch (firstFieldColorInRow) {
    case 'white':
      return (
        <Row key={rowIndex}>
          {row.map((f: Field) => {
            return (
              <FieldEachEvenGrey key={f.coordinate}>
                <FieldContent key={f.coordinate}>
                  {f.figure.symbol}
                </FieldContent>
                <FieldCoordinates>{f.coordinate}</FieldCoordinates>
              </FieldEachEvenGrey>
            )
          })}
        </Row>
      )
    case 'gray':
      return (
        <Row key={rowIndex}>
          {row.map((f: Field) => {
            return (
              <FieldEachOddGrey key={f.coordinate}>
                <FieldContent key={f.coordinate}>
                  {f.figure.symbol}
                </FieldContent>
                <FieldCoordinates>{f.coordinate}</FieldCoordinates>
              </FieldEachOddGrey>
            )
          })}
        </Row>
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
