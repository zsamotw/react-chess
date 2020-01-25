import React, { useState, ChangeEvent, KeyboardEvent } from 'react'
import styled from 'styled-components'

const InputContainer = styled.div`
  margin-top: 1rem;
`

export default function MoveCoordinatesInput(props: {
  onPressEnter: (command: string) => void, disabled: boolean
}) {
  const [moveCoordinates, setMoveCoordinates] = useState('')
  const{disabled} = props

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMoveCoordinates(event.target.value)
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.onPressEnter(moveCoordinates)
      setMoveCoordinates('')
    }
  }

  return (
    <InputContainer>
      <input
        type='text'
        value={moveCoordinates}
        placeholder = "coordinates eg.: a4 b5"
        onChange={event => handleValueChange(event)}
        onKeyDown={event => handleKeyPress(event)}
        disabled={disabled}
      />
    </InputContainer>
  )
}
