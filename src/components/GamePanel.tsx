import React from 'react'
import styled from 'styled-components'
import {
  getActivePlayerColor,
  getGameId,
  getIsGameOver,
} from '../redux/selectors'
import GameState from '../models/store-model'
import { connect } from 'react-redux'
import { Record } from 'immutable'
import Color from '../models/color'

const Panel = styled.div`
  background-color: white;
  margin-left: 3rem;
  width: 30%;
  height: 46rem;
  padding: 1rem;
`
const ActivePlayerColor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 2rem;
  border-radius: 19px;
  border: 1px solid black;
  margin-bottom: 1rem;
`

const Player = styled.div`
  font-size: 0.7rem;
`

const Moves = styled.div`
  font-size: 1rem;
`

function GamePanel(props: {
  isGame: boolean
  activePlayerColor: string
}) {
  const { isGame, activePlayerColor } = props
  const isWhitePlayer = activePlayerColor === Color.white
  const panelStyles = {
    opacity: isGame ? 1 : 0.4,
  }
  const activePlayerColorStyles = {
    opacity: isGame ? 1 : 0,
    backgroundColor: isWhitePlayer ? 'white' : 'black',
  }
  const playerStyle = {
    color: isWhitePlayer ? 'black' : 'white',
  }

  return (
    <Panel style={panelStyles}>
      <ActivePlayerColor style={activePlayerColorStyles}>
        <Player style={playerStyle}>{isWhitePlayer ? 'White' : 'Black'}</Player>
      </ActivePlayerColor>
      <Moves>Game history:</Moves>
    </Panel>
  )
}

const mapStateToProps = (state: Record<GameState> & Readonly<GameState>) => {
  const gameId = getGameId(state)
  const activePlayerColor = getActivePlayerColor(state)
  const isGameOver = getIsGameOver(state)
  const isGame = !!gameId && !isGameOver
  return { activePlayerColor, isGame }
}

export default connect(mapStateToProps, null)(GamePanel as any)
