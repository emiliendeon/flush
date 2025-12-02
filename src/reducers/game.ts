import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type DiceHand } from "../types/die";
import GameUtils from "../utils/game";

export type Round = {
	hand: DiceHand;
	isValidated?: boolean;
};

export type GameStore = {
	step: "roll" | "deal" | "result" | "end";
	rounds: Round[];
	currentRoundIndex: number;
	isDealAccepted?: boolean;
	resultRandomizer?: number;
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
			};
		},

		goToNextRound: (state) => {
			if (GameUtils.isLastRound(state.currentRoundIndex)) {
				return {
					...state,
					step: "deal",
				};
			}
			return {
				...state,
				currentRoundIndex: state.currentRoundIndex + 1,
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
				resultRandomizer: Math.random(),
			};
		},

		goToEnd: (state) => {
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
