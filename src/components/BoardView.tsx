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

const fieldWithBackground = (field: Field, firstFieldColorInRow: FieldColor) => {
  switch (firstFieldColorInRow) {
    case 'white':
      return (
        <FieldEachEvenGrey key={field.coordinate}>
          <FieldContent key={field.coordinate}><img src={field.figure.icon} alt=""></img></FieldContent>
          <FieldCoordinates>{field.coordinate}</FieldCoordinates>
        </FieldEachEvenGrey>
      )
    case 'gray':
      return (
        <FieldEachOddGrey key={field.coordinate}>
          <FieldContent key={field.coordinate}><img src={field.figure.icon} alt=""></img></FieldContent>
          <FieldCoordinates>{field.coordinate}</FieldCoordinates>
        </FieldEachOddGrey>
      )
  }
}

const rowWithFields = (
  firstFieldColorInRow: FieldColor,
  row: Row,
  rowIndex: number
) => {
      return (
        <Row key={rowIndex}>
          {row.map((f: Field) => fieldWithBackground(f, firstFieldColorInRow)
          )}
        </Row>
      )
}

export default function BoardView(props: { board: Board }) {
  const { board } = props
  const isEven = (i: number) => i % 2 === 0

  return (
    <RowsContainer>
      {board.rows.map((row: Row, rowIndex: number) =>
        isEven(rowIndex)
          ? rowWithFields('white', row, rowIndex)
          : rowWithFields('gray', row, rowIndex)
      )}
    </RowsContainer>
  )
}
