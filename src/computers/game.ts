import { type BonusId, Bonuses } from "../utils/game";
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

const computeBonuses = (rounds: GameStore["rounds"]) => {
	const combinations: { [K in BonusId]?: { count: number; total: number } } = {};
	let bonusesTotal = 0;

	for (const round of rounds) {
		const bonusId = RoundComputers.bonusId(round);
		if (bonusId !== null) {
			const count = (combinations[bonusId]?.count ?? 0) + 1;
			const total = Bonuses[bonusId].value * count;
			combinations[bonusId] = { count, total };
			bonusesTotal += Bonuses[bonusId].value;
		}
	}

	return { combinations, total: bonusesTotal };
};

const computeRawFinalScore = (
	rounds: GameStore["rounds"],
	isDealAccepted: GameStore["isDealAccepted"],
	resultRandomizer?: number
) => {
	const deal = computeDeal(rounds);

	if (isDealAccepted) {
		return deal.yes;
	}
	return deal.no[NumberUtils.safeFloor((resultRandomizer ?? Math.random()) * deal.no.length)];
};

const GameComputers = {
	deal: computeDeal,
	bonuses: computeBonuses,
	rawFinalScore: computeRawFinalScore,
};

export default GameComputers;
