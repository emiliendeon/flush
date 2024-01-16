import { type Round } from "../reducers/game";

// [A, K, Q, J, 10] -> 111 110
// [A, Q, J, 10, 9] -> 100 000
// [A, K, Q, 10, 9] -> 111 000
const computeScore = (round: Round) => {
	const handSorted = Array.from(round.hand).sort((a, b) => b - a);

	let result = 0;
	for (
		let i = 0;
		i < handSorted.length && (i === 0 || handSorted[i - 1] - handSorted[i] <= 1);
		i++
	) {
		result += 10 ** handSorted[i];
	}

	return result;
};

const RoundComputers = {
	score: computeScore,
};

export default RoundComputers;
