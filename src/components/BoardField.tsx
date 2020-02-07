import React from 'react'
import Field from '../models/field-model'
import styled from 'styled-components'
import Icon, { iconType } from './Icon'
import { useDrop } from 'react-dnd'

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

type FieldColor = 'white' | 'gray'

export default function  BoardField(field: Field, firstFieldColorInRow: FieldColor) {
  	const [{ isOver }, drop] = useDrop({
    accept: iconType,
    drop: () => console.log('hallo drop'),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
  })
  
  switch (firstFieldColorInRow) {
    case 'white':
      return (
        <FieldEachEvenGrey key={field.coordinate} ref={drop}>
          <Icon icon={field.figure.icon}></Icon>
          <FieldCoordinates>{field.coordinate}</FieldCoordinates>
        </FieldEachEvenGrey>
      )
    case 'gray':
      return (
        <FieldEachOddGrey key={field.coordinate} ref={drop}>
          <Icon icon={field.figure.icon}></Icon>
          <FieldCoordinates>{field.coordinate}</FieldCoordinates>
        </FieldEachOddGrey>
      )
  }
}