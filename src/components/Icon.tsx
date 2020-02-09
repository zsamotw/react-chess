import React from 'react'
import styled from 'styled-components'
import { useDrag } from 'react-dnd'

const IconWrapper = styled.img`
  user-select: none;
  width: 88%;
`

export const iconType = 'icon'

export default function Icon(
  props: {
    icon: string
    coordinate: string
    onDragFromCoordinate: (coordinate: string) => any
    gameId: string | null
  },
) {
  const { icon, coordinate, onDragFromCoordinate, gameId } = props
  const [{ isDragging }, drag] = useDrag({
    item: { type: iconType },
    begin: () => onDragFromCoordinate(coordinate),
    canDrag: () => !!gameId,
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })

  const styles = {
    opacity: !!isDragging ? 0.5 : 1,
  }

  return <IconWrapper src={icon} ref={drag} style={styles}></IconWrapper>
}
