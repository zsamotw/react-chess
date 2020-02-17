import React from 'react'
import { List } from 'immutable'
import {Field as FieldModel} from '../models/field-model'
import { Board } from '../models/board-model'
import styled from 'styled-components'
import Field from './Field'

type Row = List<FieldModel>

const RowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

type FieldColor = 'white' | 'gray'

const rowContainingFields = (
  firstFieldColorInRow: FieldColor,
  row: Row,
  rowIndex: number,
  isGame: boolean
) => {
  return (
    <Row key={rowIndex}>
      {row.map((f: FieldModel) => <Field key={f.coordinates} field={f} firstFieldColorInRow={firstFieldColorInRow} isGame={isGame}></Field>)}
    </Row>
  )
}

export default function Rows(props: { board: Board, isGame: boolean }) {
  const { board, isGame } = props
  const isEven = (i: number) => i % 2 === 0
  const styles ={
    opacity: isGame ? 1 : 0.4
  }

  return (
    <RowsContainer style={styles}>
      {board.rows.map((row: Row, rowIndex: number) =>
        isEven(rowIndex)
          ? rowContainingFields('white', row, rowIndex, isGame)
          : rowContainingFields('gray', row, rowIndex, isGame)
      )}
    </RowsContainer>
  )
}
