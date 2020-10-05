import GameState from "./game-state.model";
import { Record } from 'immutable'

export type State = Record<GameState> & Readonly<GameState>