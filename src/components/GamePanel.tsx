import React from 'react'
import styled from 'styled-components'
import {
  getActivePlayerColor,
  getGameId,
  getIsGameOver,
  getMoves,
  getCapturedFigures,
  getGameMode,
  getStatus,
} from '../redux/selectors'
import GameState from '../models/store.model'
import { connect } from 'react-redux'
import { Record, List } from 'immutable'
import Color from '../models/color.model'
import Move from '../models/move.model'
import CapturedFigures from '../models/captured-figures.model'
import { undoLastMove } from '../redux/actions'
import GameMode from '../models/game.mode'

const Panel = styled.div`
  background-color: white;
  width: 20vmax;
  box-sizing: border-box;
  user-select: none;
  font-size: 1rem;
  margin: 0 0 0 3rem;

  @media screen and (max-width: 1024px) {
    width: 64vmin;
    margin: 3rem 0 0 0;
  }
`

const PanelHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

const ActivePlayerColor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 3rem;
  min-height: 3rem;
  border-radius: 30px;
  border: 1px solid black;
  margin: 0 1rem 1rem 0;
  transition: all 0.5s ease;
`

const Player = styled.div`
  font-size: 0.7rem;
`

const GameModeInfo = styled.div`
  font-size: 0.8rem;
  margin-top: 0.5rem;
  margin-bottom: 0.3rem;
`

const UndoButton = styled.button`
  /* temporary display none */
  display: none;
  border-radius: 5px;
  border-color: transparent;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
  background-color: #dbdbdb;

  &:hover {
    background-color: #7d7c7c;
    color: #eeeded;
  }
`

const CapturedFiguresSection = styled.section``

const Icon = styled.img`
  width: 1.4rem;
`

const GameMovesSection = styled.section`
  padding: 0.5rem 0.5rem;
  max-height: 20vh;
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
  min-width: 0.9rem;
  min-height: 0.9rem;
  border-radius: 20px;
  border: 1px solid black;
  display: inline-block;
`

const EndGameStatus = styled.div`
  color: red;
  font-size: 1.3rem;
  text-transform: uppercase;
`

function GamePanel(props: {
  isGame: boolean
  status: string
  isGameOver: boolean
  gameMode: GameMode
  activePlayerColor: string
  moves: List<Move>
  capturedFigures: CapturedFigures
  undoMove: any
}) {
  const {
    isGame,
    status,
    isGameOver,
    gameMode,
    activePlayerColor,
    moves,
    capturedFigures,
    undoMove,
  } = props
  const isWhitePlayer = activePlayerColor === Color.white
  const styles = {
    panelStyles: {
      transition: 'opacity 4s ease',
      opacity: isGame && !isGameOver ? 1 : 0.1,
    },

    activePlayerColorStyles: {
      opacity: isGame ? 1 : 0,
      backgroundColor: isWhitePlayer ? 'white' : 'black',
    },
    playerStyle: {
      color: isWhitePlayer ? 'black' : 'white',
    },
    gameModeStyle: {
      opacity: isGame ? 1 : 0,
    },
    undoButtonStyles: {
      opacity: isGame ? 1 : 0,
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
    <>
      <Panel style={styles.panelStyles}>
        <PanelHeader>
          <ActivePlayerColor style={styles.activePlayerColorStyles}>
            <Player style={styles.playerStyle}>
              {isWhitePlayer ? 'White' : 'Black'}
            </Player>
          </ActivePlayerColor>
          {isGameOver ? <EndGameStatus>{status}</EndGameStatus> : null}
          <UndoButton style={styles.undoButtonStyles} onClick={undoMove}>
            UNDO
          </UndoButton>
        </PanelHeader>
        <CapturedFiguresSection>
          <div>
            {capturedFigures.white.map((icon: string, index: number) => (
              <Icon src={icon} alt='' key={icon + index}></Icon>
            ))}
          </div>
          <div>
            {capturedFigures.black.map((icon: string, index: number) => (
              <Icon src={icon} alt='' key={icon + index}></Icon>
            ))}
          </div>
        </CapturedFiguresSection>
        <GameModeInfo style={styles.gameModeStyle}>{gameMode}</GameModeInfo>
        <GameMovesSection>
          {moves.map((move: Move, index: number) => (
            <PlayerMove key={index}>
              <div style={styles.indexStyles}>{moves.size - index}</div>
              <MoveColor
                style={styles.getBackgroundColor(
                  move.color as string,
                )}></MoveColor>
              <div style={styles.startingPointCoordinateStyles}>
                {move.startingPointCoordinate}
              </div>
              <div>{move.endPointCoordinate}</div>
            </PlayerMove>
          ))}
        </GameMovesSection>
      </Panel>
    </>
  )
}

const mapStateToProps = (state: Record<GameState> & Readonly<GameState>) => {
  const gameId = getGameId(state)
  const activePlayerColor = getActivePlayerColor(state)
  const status = getStatus(state)
  const isGameOver = getIsGameOver(state)
  const isGame = !!gameId
  const moves = getMoves(state)
  const capturedFigures = getCapturedFigures(state)
  const gameMode = getGameMode(state)
  return {
    activePlayerColor,
    isGame,
    moves,
    capturedFigures,
    status,
    isGameOver,
    gameMode,
  }
}
const mapDispatchToState = (dispatch: any) => {
  return {
    undoMove: () => undoLastMove(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToState)(GamePanel as any)
