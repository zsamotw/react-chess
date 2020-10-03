import React, { useContext } from 'react'
import { Field as FieldModel } from '../models/field.model'
import styled from 'styled-components'
import Icon, { iconType } from './Icon'
import { useDrop } from 'react-dnd'
import { connect } from 'react-redux'
import { setFromCoordinates, makePlayerMove, makePlayerMoveApiRequest } from '../redux/actions'
import { mapRowNumber, mapFieldIndexToLetter } from '../helpers/board-helper'
import { ThemeContext } from 'styled-components';

const FieldGeneric = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8vmin;
  width: 8vmin;
  font-size: 1.2rem;
  padding: 0.5rem;
  box-sizing: border-box;
`
const FieldEachEvenGrey = styled(FieldGeneric as any)`
  background-color: ${props => props.theme.secondary.main};

  &:nth-child(even) {
    background-color: ${props => props.theme.primary.xLight};
  }
`
const FieldEachOddGrey = styled(FieldGeneric as any)`
  background-color: ${props => props.theme.secondary.main};

  &:nth-child(odd) {
    background-color: ${props => props.theme.primary.xLight};
  }
`

const FieldCoordinates = styled.div`
  position: absolute;
  color: ${props => props.theme.primary.main};
  font-size: 0.4rem;
  width: 15px;
  height: 15px;
  border: 1px solid #c8c4c4;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Latitude = styled(FieldCoordinates as any)`
  top: auto;
  left: -1.5rem;
`

const Longitude = styled(FieldCoordinates as any)`
  bottom: -1.5rem;
  left: auto;
  text-transform: uppercase;
`

type FieldColor = 'white' | 'gray'

function Field(props: {
  field: FieldModel
  fieldIndex: number
  rowIndex: number
  firstFieldColorInRow: FieldColor
  setCoordinatesForStartingPoint: any
  dropOnEndPointField: any
}) {
  const {
    field,
    fieldIndex,
    rowIndex,
    firstFieldColorInRow,
    setCoordinatesForStartingPoint,
    dropOnEndPointField,
  } = props
  const [{ isOver }, drop] = useDrop({
    accept: iconType,
    drop: () => dropOnEndPointField(field.coordinates),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })
  const theme = useContext(ThemeContext);
  const backgroundOnOver = {
    backgroundColor: theme.primary.light
  }

  const handleDragFromStartingPoint = (coordinates: string) =>
    setCoordinatesForStartingPoint(coordinates)

  switch (firstFieldColorInRow) {
    case 'white':
      return (
        <FieldEachEvenGrey
          key={field.coordinates}
          ref={drop}
          style={!!isOver ? backgroundOnOver : {}}>
          {fieldIndex === 0 ? (
            <Latitude>{mapRowNumber(rowIndex)}</Latitude>
          ) : null}
          {rowIndex === 7 ? (
            <Longitude>{mapFieldIndexToLetter(fieldIndex)}</Longitude>
          ) : null}
          <Icon
            icon={field.figure.icon}
            coordinates={field.coordinates}
            onDragIconFromStartingPoint={handleDragFromStartingPoint}></Icon>
        </FieldEachEvenGrey>
      )
    case 'gray':
      return (
        <FieldEachOddGrey
          key={field.coordinates}
          ref={drop}
          style={!!isOver ? backgroundOnOver : {}}>
          {fieldIndex === 0 ? (
            <Latitude>{mapRowNumber(rowIndex)}</Latitude>
          ) : null}
          {rowIndex === 7 ? (
            <Longitude>{mapFieldIndexToLetter(fieldIndex)}</Longitude>
          ) : null}
          <Icon
            icon={field.figure.icon}
            coordinates={field.coordinates}
            onDragIconFromStartingPoint={handleDragFromStartingPoint}></Icon>
        </FieldEachOddGrey>
      )
  }
}

const mapDispatchToState = (dispatch: any) => {
  return {
    setCoordinatesForStartingPoint: (from: string) =>
      dispatch(setFromCoordinates({ payload: from })),
    dropOnEndPointField: (to: string) => dispatch(makePlayerMoveApiRequest({payload: {to}})),
    // dropOnEndPointField: (to: string) => console.log('fofofofofof')
  }
}

export default connect(null, mapDispatchToState)(Field)
