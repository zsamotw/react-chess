import React, { useState, ChangeEvent, KeyboardEvent } from 'react'

export default function MoveInput(props: {
  onCommandEnter: (command: string) => void
}) {
  const [moveValue, setMoveValue] = useState('')

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMoveValue(event.target.value)
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.onCommandEnter(moveValue)
      setMoveValue('')
    }
  }

  return (
    <input
      type='text'
      value={moveValue}
      onChange={event => handleValueChange(event)}
      onKeyDown={event => handleKeyPress(event)}
    />
  )
}
