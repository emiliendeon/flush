import GameComputers from "../computers/game";
import RoundComputers from "../computers/round";
import { type Store } from "../store";
import { createSelector } from "@reduxjs/toolkit";

const getStep = (state: Store) => state.game.step;
const getRounds = (state: Store) => state.game.rounds;
const getCurrentRoundIndex = (state: Store) => state.game.currentRoundIndex;
const getIsDealAccepted = (state: Store) => state.game.isDealAccepted;
const getResultRandomizer = (state: Store) => state.game.resultRandomizer;

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

	result: createSelector(
		[getStep, getRounds, getIsDealAccepted, getResultRandomizer],
		(step, rounds, isDealAccepted, resultRandomizer) => {
			const bonuses = GameComputers.bonuses(rounds);

			if (!["result", "end"].includes(step)) {
				return { bonuses };
			}

			const rawFinalScore = GameComputers.rawFinalScore(
				rounds,
				isDealAccepted,
				resultRandomizer
			);
			const finalScore = rawFinalScore + bonuses.total;

			return { bonuses, rawFinalScore, finalScore };
		}
	),
};

export default GameSelectors;
