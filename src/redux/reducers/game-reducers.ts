import { createReducer } from "@reduxjs/toolkit";
import { makeMove } from "../actions";
import Board from "../../models/Board";
import { initBoard } from "../../models/Board";

interface Store {
	gameId: string | null;
	board: any;
}

const initialState = {
	gameId: null,
	board: initBoard
} as Store;

const gameReducer = createReducer(initialState, {
	[makeMove.type]: state => state
});

export { gameReducer };
