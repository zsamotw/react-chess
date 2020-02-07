import React from 'react'
import styled from 'styled-components'
import { useDrag } from 'react-dnd'

const IconWrapper = styled.img`
  width: 88%;
`

export const iconType = 'icon'

export default function Icon(props:{icon: string}) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: iconType },
    begin: () => console.log('fired'), 
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    })
  })

  return <IconWrapper src={props.icon} alt='' ref={drag}></IconWrapper>
}
