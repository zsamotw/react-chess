import React from 'react'
import styled from 'styled-components'
import { useDrag } from 'react-dnd'

const IconWrapper = styled.img`
  user-select: none;
  width: 88%;
  cursor: move;
`

export const iconType = 'icon'

export default function Icon(props: {
  icon: string
  coordinates: string
  onDragIconFromStartingPoint: (coordinates: string) => any
  isGame: boolean
}) {
  const { icon, coordinates, onDragIconFromStartingPoint, isGame } = props
  const [{ isDragging }, drag] = useDrag({
    item: { type: iconType },
    begin: () => onDragIconFromStartingPoint(coordinates),
    canDrag: () => isGame,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const styles = {
    opacity: !!isDragging ? 0.5 : 1,
  }

  return <IconWrapper src={icon} ref={drag} style={styles}></IconWrapper>
}
