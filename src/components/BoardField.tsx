import React from 'react'
import Field from '../models/field-model'
import styled from 'styled-components'
import Icon, { iconType } from './Icon'
import { useDrop } from 'react-dnd'
import { connect } from 'react-redux'
import { setFromCoordinate, makePlayerMove } from '../redux/actions'
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
  setCoordinateForStartingPoint: any
  dropOnField: any
  gameId: string | null
}) {
  const {
    field,
    firstFieldColorInRow,
    setCoordinateForStartingPoint,
    dropOnField,
    gameId
  } = props
  const [{ isOver }, drop] = useDrop({
    accept: iconType,
    drop: () => dropOnField(field.coordinate),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  })

  const backgroundOnOver = {
    backgroundColor: '#95a6bb'
  }

  const handleDragFromCoordinate = (coordinate: string) =>
    setCoordinateForStartingPoint(coordinate)

  switch (firstFieldColorInRow) {
    case 'white':
      return (
        <FieldEachEvenGrey key={field.coordinate} ref={drop} style={!!isOver ? backgroundOnOver : {}}>
          <Icon
            icon={field.figure.icon}
            coordinate={field.coordinate}
            gameId={gameId}
            onDragIcon={handleDragFromCoordinate}></Icon>
        </FieldEachEvenGrey>
      )
    case 'gray':
      return (
        <FieldEachOddGrey key={field.coordinate} ref={drop} style={!!isOver ? backgroundOnOver : {}}>
          <Icon
            icon={field.figure.icon}
            coordinate={field.coordinate}
            gameId={gameId}
            onDragIcon={handleDragFromCoordinate}></Icon>
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
    setCoordinateForStartingPoint: (from: string) =>
      dispatch(setFromCoordinate({ payload: from })),
    dropOnField: (to: string) => makePlayerMove(to, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToState)(BoardField)
