import GameComputers from "../computers/game";
import RoundComputers from "../computers/round";
import { type Store } from "../store";
import { createSelector } from "@reduxjs/toolkit";

const getStep = (state: Store) => state.game.step;
const getRounds = (state: Store) => state.game.rounds;
const getCurrentRoundIndex = (state: Store) => state.game.currentRoundIndex;
const getIsDealAccepted = (state: Store) => state.game.isDealAccepted;

const getRoundIndex = (_state: Store, index: number) => index;

const GameSelectors = {
	currentRound: createSelector([getRounds, getCurrentRoundIndex], (rounds, currentRoundIndex) => {
		return rounds[currentRoundIndex];
	}),

	roundScore: createSelector([getRounds, getRoundIndex], (rounds, roundIndex) => {
		if (!rounds[roundIndex]?.isValidated) {
			return null;
		}
		return RoundComputers.score(rounds[roundIndex]);
	}),

	deal: createSelector([getStep, getRounds], (step, rounds) => {
		if (step !== "deal") {
			return null;
		}
		return GameComputers.deal(rounds);
	}),

	finalScore: createSelector(
		[getStep, getRounds, getIsDealAccepted],
		(step, rounds, isDealAccepted) => {
			if (!["result", "end"].includes(step)) {
				return null;
			}
			return GameComputers.finalScore(rounds, isDealAccepted);
		}
	),
};

export default GameSelectors;
