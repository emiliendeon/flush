import { type Deal } from "../types/game";
import { type GameStore } from "../reducers/game";
import NumberUtils from "../utils/number";
import RoundComputers from "./round";

const computeRoundScores = (rounds: GameStore["rounds"]) => {
	return rounds.map((round) => RoundComputers.score(round)).sort((a, b) => a - b);
};

// [100 000, 200 000, 300 000] -> { yes: 200 000, no: [100 000, 300 000] }
const computeDeal = (rounds: GameStore["rounds"]): Deal => {
	const roundScores = computeRoundScores(rounds);

	const medianIndex = NumberUtils.safeFloor(roundScores.length / 2);

	let medianScore;
	if (roundScores.length % 2 === 0) {
		medianScore = NumberUtils.safeRoundUpper(
			(roundScores[medianIndex - 1] + roundScores[medianIndex]) / 2
		);
	} else {
		medianScore = roundScores[medianIndex];
	}

	const extremeScores: Deal["no"] = [roundScores[0], roundScores[roundScores.length - 1]];

	return {
		yes: medianScore,
		no: extremeScores,
	};
};

const computeFinalScore = (
	rounds: GameStore["rounds"],
	isDealAccepted: GameStore["isDealAccepted"]
) => {
	const deal = computeDeal(rounds);

	if (isDealAccepted) {
		return deal.yes;
	}
	return deal.no[NumberUtils.safeFloor(Math.random() * deal.no.length)];
};

const GameComputers = {
	deal: computeDeal,
	finalScore: computeFinalScore,
};

export default GameComputers;
