import HandComputers from "../computers/hand";
import { type Store } from "../store";
import { createSelector } from "@reduxjs/toolkit";

const getRounds = (state: Store) => state.game.rounds;
const getCurrentRoundIndex = (state: Store) => state.game.currentRoundIndex;

const getRoundIndex = (_state: Store, index: number) => index;

const GameSelectors = {
	currentRound: createSelector([getRounds, getCurrentRoundIndex], (rounds, currentRoundIndex) => {
		return rounds[currentRoundIndex];
	}),

	score: createSelector([getRounds, getRoundIndex], (rounds, roundIndex) => {
		if (!rounds[roundIndex]?.isValidated) {
			return null;
		}
		return HandComputers.score(rounds[roundIndex].hand);
	}),
};

export default GameSelectors;
