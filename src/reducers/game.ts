import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type DiceHand } from "../types/dice";
import { ROUNDS_COUNT } from "../utils/game";

export type Round = {
	hand: DiceHand;
	isValidated?: boolean;
};

export type GameStore = {
	step: "roll" | "deal" | "result" | "end";
	rounds: Round[];
	currentRoundIndex: number;
	isDealAccepted?: boolean;
};

const initialState: GameStore = {
	step: "roll",
	rounds: [],
	currentRoundIndex: 0,
};

const setRoundProperty =
	(state: GameStore) =>
	<T extends keyof Round>(index: number, property: T, value: Round[T]) => {
		const rounds = [...state.rounds];
		rounds[index] = { ...state.rounds[index], [property]: value };

		return {
			...state,
			rounds,
		};
	};

const GameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {
		setCurrentRoundHand: (
			state,
			{ payload }: PayloadAction<GameStore["rounds"][number]["hand"]>
		) => {
			return setRoundProperty(state)(state.currentRoundIndex, "hand", payload);
		},

		validateCurrentRound: (state) => {
			return {
				...setRoundProperty(state)(state.currentRoundIndex, "isValidated", true),
				step: state.currentRoundIndex >= ROUNDS_COUNT - 1 ? "deal" : state.step,
			};
		},

		goToNextRound: (state) => {
			return {
				...state,
				currentRoundIndex: Math.min(state.currentRoundIndex + 1, ROUNDS_COUNT - 1),
			};
		},

		acceptDeal: (state) => {
			return {
				...state,
				step: "result",
				isDealAccepted: true,
			};
		},

		rejectDeal: (state) => {
			return {
				...state,
				step: "result",
				isDealAccepted: false,
			};
		},

		end: (state) => {
			return {
				...state,
				step: "end",
			};
		},

		reset: () => {
			return initialState;
		},
	},
});

export const GameActions = GameSlice.actions;
export default GameSlice.reducer;
