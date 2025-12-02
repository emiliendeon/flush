import { type BonusId, BonusIds, Bonuses } from "../utils/game";
import { type DiceHand, DieValues } from "../types/die";
import ArrayUtils from "../utils/array";

type HandCounts = number[] & { length: typeof DieValues.length };

const computeStraightLength = (handCounts: HandCounts) => {
	let maxLength = 0;
	let currentLength = 0;

	for (const count of handCounts) {
		if (count >= 1) {
			if (++currentLength > maxLength) {
				maxLength = currentLength;
			}
		} else {
			currentLength = 0;
		}
	}

	return maxLength;
};

const HandVerifiers: {
	[K in BonusId]: (handCounts: HandCounts) => boolean;
} = {
	twoPairs: (handCounts: HandCounts) => {
		return ArrayUtils.count(handCounts, (count) => count >= 2) >= 2;
	},

	threeOfAKind: (handCounts: HandCounts) => {
		return handCounts.some((count) => count >= 3);
	},

	fourOfAKind: (handCounts: HandCounts) => {
		return handCounts.some((count) => count >= 4);
	},

	fullHouse: (handCounts: HandCounts) => {
		const primaryPartIndex = handCounts.findIndex((count) => count >= 3);
		const secondaryPartIndex = handCounts.findIndex(
			(count, index) => index !== primaryPartIndex && count >= 2
		);
		return primaryPartIndex !== -1 && secondaryPartIndex !== -1;
	},

	smallStraight: (handCounts: HandCounts) => {
		return computeStraightLength(handCounts) >= 4;
	},

	largeStraight: (handCounts: HandCounts) => {
		return computeStraightLength(handCounts) >= 5;
	},

	flush: (handCounts: HandCounts) => {
		return handCounts.some((count) => count >= 5);
	},
};

// [A, K, Q, J, 10] -> 111 110
// [A, Q, J, 10, 9] -> 100 000
// [A, K, Q, 10, 9] -> 111 000
const computeScore = (hand: DiceHand) => {
	const handSorted = Array.from(hand).sort((a, b) => b - a);

	let score = 0;
	for (
		let i = 0;
		i < handSorted.length && (i === 0 || handSorted[i - 1] - handSorted[i] <= 1);
		i++
	) {
		score += 10 ** handSorted[i];
	}

	return score;
};

const computeBonusId = (hand: DiceHand): BonusId | null => {
	const handCounts = DieValues.map((dieValue) =>
		ArrayUtils.count(hand, (value) => value === dieValue)
	) as HandCounts;

	let maxBonusId = null;
	for (const bonusId of BonusIds) {
		if (
			HandVerifiers[bonusId](handCounts) &&
			(maxBonusId === null || Bonuses[bonusId].value > Bonuses[maxBonusId].value)
		) {
			maxBonusId = bonusId;
		}
	}

	return maxBonusId;
};

const HandComputers = {
	score: computeScore,
	bonusId: computeBonusId,
};

export default HandComputers;
