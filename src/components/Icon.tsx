import React from 'react'
import styled from 'styled-components'
import { useDrag } from 'react-dnd'
import { getGameId, getIsGameOver } from '../redux/selectors'
import GameState from '../models/store-model'
import { Record } from 'immutable'
import { connect } from 'react-redux'

const IconWrapper = styled.img`
  user-select: none;
  width: 88%;
  cursor: move;
`

export const iconType = 'icon'

function Icon(props: {
  icon: string,
  coordinates: string,
  onDragIconFromStartingPoint: (coordinates: string) => any,
  gameId: string | null,
  isGameOver: boolean
}) {
  const { icon, coordinates, onDragIconFromStartingPoint, gameId, isGameOver } = props
  const [{ isDragging }, drag] = useDrag({
    item: { type: iconType },
    begin: () => onDragIconFromStartingPoint(coordinates),
    canDrag: () => !!gameId && !isGameOver,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const iconStyles = {
    opacity: !!isDragging ? 0.5 : 1,
  }

  return <IconWrapper src={icon} ref={drag} style={iconStyles}></IconWrapper>
}

const mapStateToProps = (state: Record<GameState> & Readonly<GameState>) => {
  const gameId = getGameId(state)
  const isGameOver = getIsGameOver(state)
  return { gameId, isGameOver }
}

export default connect(mapStateToProps)(Icon)