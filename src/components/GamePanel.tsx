import React from 'react'
import styled from 'styled-components'
import {
  getActivePlayerColor,
  getGameId,
  getIsGameOver,
  getMoves,
  getHitFigures,
} from '../redux/selectors'
import GameState from '../models/store-model'
import { connect } from 'react-redux'
import { Record, List } from 'immutable'
import Color from '../models/color'
import Move from '../models/move-model'
import HitFigures from '../models/hit-figures'

const Panel = styled.div`
  background-color: white;
  margin-left: 3rem;
  width: 20%;
  height: 46rem;
  padding: 1rem;
  user-select: none;
  font-size: 1rem;
`

const ActivePlayerColorSection = styled.section``

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
const HitFiguresSection = styled.section``

const Icon = styled.img`
  width: 1.4rem;
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
  moves: List<Move>,
  hitFigures: HitFigures
}) {
  const { isGame, activePlayerColor, moves, hitFigures } = props
  const isWhitePlayer = activePlayerColor === Color.white
  const styles = {
    panelStyles: {
      opacity: isGame ? 1 : 0.4,
    },

    activePlayerColorStyles: {
      opacity: isGame ? 1 : 0,
      backgroundColor: isWhitePlayer ? 'white' : 'black',
    },
    playerStyle: {
      color: isWhitePlayer ? 'black' : 'white',
    },
    indexStyles: {
      width: '1rem',
      margin: '0px 2rem 0 0',
      fontSize: '.7rem',
    },
    startingPointCoordinateStyles: {
      width: '1rem',
      margin: '0px 1.6rem 0px 3rem',
    },
    getBackgroundColor: (color: string) => ({
      backgroundColor: color.toLowerCase(),
    }),
  }

  return (
    <Panel style={styles.panelStyles}>
      <ActivePlayerColorSection>
        <ActivePlayerColor style={styles.activePlayerColorStyles}>
          <Player style={styles.playerStyle}>
            {isWhitePlayer ? 'White' : 'Black'}
          </Player>
        </ActivePlayerColor>
      </ActivePlayerColorSection>
      <HitFiguresSection>
        <div> {hitFigures.white.map((i) => <Icon  src={i} alt='' key={i}></Icon>)} </div>
        <div> {hitFigures.black.map((i) => <Icon  src={i} alt='' key={i}></Icon>)} </div>
      </HitFiguresSection>
      <GameMovesSection>
        <GameMoves>
          {moves.map((move: Move, index: number) => (
            <PlayerMove key={index}>
              <div style={styles.indexStyles}>{moves.size - index}</div>
              <MoveColor
                style={styles.getBackgroundColor(move.color as string)}></MoveColor>
              <div style={styles.startingPointCoordinateStyles}>
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
  const hitFigures = getHitFigures(state)
  return { activePlayerColor, isGame, moves, hitFigures }
}

export default connect(mapStateToProps, null)(GamePanel as any)
