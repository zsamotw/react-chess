import React from 'react'
import styled from 'styled-components'
import { useDrag } from 'react-dnd'
import { getGameId, getIsGameOver, getIsFetchingMove } from '../redux/selectors'
import { connect } from 'react-redux'
import { State } from '../models/state.model'

const IconWrapper = styled.img<{isDragging: boolean}>`
  user-select: none;
  width: 88%;
  cursor: move;
  opacity: ${props => props.isDragging ? 0.5 : 1};
`

export const iconType = 'icon'

function Icon(props: {
  icon: string,
  coordinates: string,
  onDragIconFromStartingPoint: (coordinates: string) => any,
  gameId: string | null,
  isGameOver: boolean,
  isFetchingMove: boolean
}) {
  const { icon, coordinates, onDragIconFromStartingPoint, gameId, isGameOver, isFetchingMove } = props
  const [{ isDragging }, drag] = useDrag({
    item: { type: iconType },
    begin: () => onDragIconFromStartingPoint(coordinates),
    canDrag: () => !!gameId && !isGameOver && !isFetchingMove,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return <IconWrapper src={icon} ref={drag}  isDragging={isDragging}></IconWrapper>
}

const mapStateToProps = (state: State) => {
  const gameId = getGameId(state)
  const isGameOver = getIsGameOver(state)
  const isFetchingMove = getIsFetchingMove(state)
  return { gameId, isGameOver, isFetchingMove }
}

export default connect(mapStateToProps)(Icon)