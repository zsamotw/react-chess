import React from 'react'
import styled from 'styled-components'
import {
  getActivePlayerColor,
  getGameId,
  getIsGameOver,
  getMoves,
} from '../redux/selectors'
import GameState from '../models/store-model'
import { connect } from 'react-redux'
import { Record, List } from 'immutable'
import Color from '../models/color'
import Move from '../models/move-model'

const Panel = styled.div`
  background-color: white;
  margin-left: 3rem;
  width: 20%;
  height: 46rem;
  padding: 1rem;
  user-select: none;
  font-size: 1rem;
`
const ActivePlayerColor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 30px;
  border: 1px solid black;
  margin-bottom: 1rem;
  transition: all 0.5s ease;
`

const Player = styled.div`
  font-size: 0.7rem;
`

const GameMovesSection = styled.section``

const GameMoves = styled.div`
  padding: 0.5rem 0.5rem;
  height: 39rem;
  overflow: auto;
  border-top: 1px solid #919191;
`

const PlayerMove = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.4rem;
  font-size: 0.9rem;
  font-weight: bold;
`

const MoveColor = styled.div`
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 20px;
  border: 1px solid black;
  display: inline-block;
`

function GamePanel(props: {
  isGame: boolean
  activePlayerColor: string
  moves: List<Move>
}) {
  const { isGame, activePlayerColor, moves } = props
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
  const getBackgroundColor = (color: string) => ({
    backgroundColor: color.toLowerCase(),
  })
  const indexStyles = {
    width: '1rem',
    margin: '0px 2rem 0 0',
    fontSize: '.7rem'
  }
  const startingPointCoordinateStyles = {
    width: '1rem',
    margin: '0px 1.6rem 0px 3rem',
  }

  return (
    <Panel style={panelStyles}>
      <ActivePlayerColor style={activePlayerColorStyles}>
        <Player style={playerStyle}>{isWhitePlayer ? 'White' : 'Black'}</Player>
      </ActivePlayerColor>
      <GameMovesSection>
        <GameMoves>
          {moves.map((move: Move, index:number) => (
            <PlayerMove>
              <div style={indexStyles}>{moves.size - index}</div>
              <MoveColor
                style={getBackgroundColor(move.color as string)}></MoveColor>
              <div style={startingPointCoordinateStyles}>
                {move.startingPointCoordinate}
              </div>
              <div>{move.endPointCoordinate}</div>
            </PlayerMove>
          ))}
        </GameMoves>
      </GameMovesSection>
    </Panel>
  )
}

const mapStateToProps = (state: Record<GameState> & Readonly<GameState>) => {
  const gameId = getGameId(state)
  const activePlayerColor = getActivePlayerColor(state)
  const isGameOver = getIsGameOver(state)
  const isGame = !!gameId && !isGameOver
  const moves = getMoves(state)
  return { activePlayerColor, isGame, moves }
}

export default connect(mapStateToProps, null)(GamePanel as any)
