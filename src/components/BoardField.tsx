import React from 'react'
import Field from '../models/field-model'
import styled from 'styled-components'
import Icon, { iconType } from './Icon'
import { useDrop } from 'react-dnd'
import { connect } from 'react-redux'
import { setFromCoordinates, makePlayerMove } from '../redux/actions'
import GameState from '../models/store-model'
import { getGameId } from '../redux/selectors'
import { Record } from 'immutable'

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

type FieldColor = 'white' | 'gray'

function BoardField(props: {
  field: Field
  firstFieldColorInRow: FieldColor
  setCoordinatesForStartingPoint: any
  dropOnEndPointField: any
  gameId: string | null
}) {
  const {
    field,
    firstFieldColorInRow,
    setCoordinatesForStartingPoint,
    dropOnEndPointField,
    gameId
  } = props
  const [{ isOver }, drop] = useDrop({
    accept: iconType,
    drop: () => dropOnEndPointField(field.coordinates),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  })

  const backgroundOnOver = {
    backgroundColor: '#95a6bb'
  }

  const handleDragFromStartingPoint = (coordinates: string) =>
    setCoordinatesForStartingPoint(coordinates)

  switch (firstFieldColorInRow) {
    case 'white':
      return (
        <FieldEachEvenGrey key={field.coordinates} ref={drop} style={!!isOver ? backgroundOnOver : {}}>
          <Icon
            icon={field.figure.icon}
            coordinates={field.coordinates}
            gameId={gameId}
            onDragIconFromStartingPoint={handleDragFromStartingPoint}></Icon>
        </FieldEachEvenGrey>
      )
    case 'gray':
      return (
        <FieldEachOddGrey key={field.coordinates} ref={drop} style={!!isOver ? backgroundOnOver : {}}>
          <Icon
            icon={field.figure.icon}
            coordinates={field.coordinates}
            gameId={gameId}
            onDragIconFromStartingPoint={handleDragFromStartingPoint}></Icon>
        </FieldEachOddGrey>
      )
  }
}

const mapStateToProps = (state: Record<GameState> & Readonly<GameState>) => {
  const gameId = getGameId(state)
  return { gameId }
}

const mapDispatchToState = (dispatch: any) => {
  return {
    setCoordinatesForStartingPoint: (from: string) =>
      dispatch(setFromCoordinates({ payload: from })),
    dropOnEndPointField: (to: string) => makePlayerMove(to, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToState)(BoardField)
