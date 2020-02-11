import React from 'react'
import { List } from 'immutable'
import Field from '../models/field-model'
import Board from '../models/board-model'
import styled from 'styled-components'
import BoardField from './BoardField'

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

type FieldColor = 'white' | 'gray'

const rowContainingFields = (
  firstFieldColorInRow: FieldColor,
  row: Row,
  rowIndex: number
) => {
  return (
    <Row key={rowIndex}>
      {row.map((f: Field) => <BoardField key={f.coordinates} field={f} firstFieldColorInRow={firstFieldColorInRow}></BoardField>)}
    </Row>
  )
}

export default function BoardView(props: { board: Board, gameId: string }) {
  const { board, gameId } = props
  const isEven = (i: number) => i % 2 === 0
  const styles ={
    opacity: !!gameId ? 1 : 0.4
  }

  return (
    <RowsContainer style={styles}>
      {board.rows.map((row: Row, rowIndex: number) =>
        isEven(rowIndex)
          ? rowContainingFields('white', row, rowIndex)
          : rowContainingFields('gray', row, rowIndex)
      )}
    </RowsContainer>
  )
}
