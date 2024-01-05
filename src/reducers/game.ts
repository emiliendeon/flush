import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type DiceHand } from "../types/dice";

export type GameStore = {
	hand?: DiceHand;
	isValidated: boolean;
};

const initialState: GameStore = {
	isValidated: false,
};

const GameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {
		setHand: (state, { payload }: PayloadAction<GameStore["hand"]>) => {
			return { ...state, hand: payload };
		},
		resetHand: (state) => {
			return { ...state, hand: initialState.hand };
		},
		setIsValidated: (state, { payload }: PayloadAction<GameStore["isValidated"]>) => {
			return { ...state, isValidated: payload };
		},
	},
});

export const GameActions = GameSlice.actions;
export default GameSlice.reducer;
