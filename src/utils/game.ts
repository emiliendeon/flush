import { type GameStore } from "../reducers/game";

export const ROUNDS_COUNT = 3;

// defines bonus application order
export const BonusIds = [
	"twoPairs",
	"threeOfAKind",
	"fourOfAKind",
	"fullHouse",
	"smallStraight",
	"largeStraight",
	"flush",
] as const;
export type BonusId = (typeof BonusIds)[number];

type Bonus = {
	label: string;
	value: number;
};

export const Bonuses: { [K in BonusId]: Bonus } = {
	twoPairs: {
		label: "2 paires",
		value: 15000,
	},

	threeOfAKind: {
		label: "Brelan",
		value: 30000,
	},

	fourOfAKind: {
		label: "Carré",
		value: 60000,
	},

	fullHouse: {
		label: "Full",
		value: 40000,
	},

	smallStraight: {
		label: "Petite suite",
		value: 30000,
	},

	largeStraight: {
		label: "Grande suite",
		value: 60000,
	},

	flush: {
		label: "Flush",
		value: 100000,
	},
};

const GameUtils = {
	isLastRound: (roundIndex: GameStore["currentRoundIndex"]) => roundIndex >= ROUNDS_COUNT - 1,
};

export default GameUtils;
