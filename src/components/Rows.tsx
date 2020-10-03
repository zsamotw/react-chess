import React from 'react'
import {Field as FieldModel} from '../models/field.model'
import { Board } from '../models/board.model'
import styled from 'styled-components'
import Field from './Field'
import { Row } from '../models/row-type'

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

const rowToHtml = (
  firstFieldColorInRow: FieldColor,
  row: Row,
  rowIndex: number,
) => {
  return (
    <Row key={rowIndex}>
      {row.map((f: FieldModel, fieldIndex: number) => <Field key={f.coordinates} field={f} fieldIndex={fieldIndex} rowIndex={rowIndex} firstFieldColorInRow={firstFieldColorInRow}></Field>)}
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
          ? rowToHtml('white', row, rowIndex)
          : rowToHtml('gray', row, rowIndex)
      )}
    </RowsContainer>
  )
}
