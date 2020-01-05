import React from 'react'
import { List } from 'immutable'
import Field from '../models/field-model'
import Board from '../models/board-model'
import styled from 'styled-components'
import MoveInput from './MoveInput'

type Row = List<Field>

const ItIsContainer = styled.div`
  display: flex;
  flex-direction: column;
`
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
              </FieldContainerStartsWithGray>
            )
          })}
        </RowContainer>
      )
  }
}

export default function BoardView(props: { board: Board }) {
  const { board } = props
  const isEven = (i: number) => i % 2 === 0
  const handleCommandEnter = (command: string) => console.log(command)

  return (
    <ItIsContainer>
      <RowsContainer>
        {board.rows.map((row: Row, rowIndex: number) =>
          isEven(rowIndex)
            ? rowStartsWith('white', row, rowIndex)
            : rowStartsWith('gray', row, rowIndex)
        )}
      </RowsContainer>
      <MoveInput onCommandEnter={command => handleCommandEnter(command)} />
    </ItIsContainer>
  )
}
