import { type DiceHand } from "../types/dice";

const HandComputers = {
	// [A, K, Q, J, 10] -> 111 110
	// [A, Q, J, 10, 9] -> 100 000
	// [A, K, Q, 10, 9] -> 111 000
	score: (hand: DiceHand) => {
		const handSorted = Array.from(hand).sort((a, b) => b - a);

		let result = 0;
		for (
			let i = 0;
			i < handSorted.length && (i === 0 || handSorted[i - 1] - handSorted[i] <= 1);
			i++
		) {
			result += 10 ** handSorted[i];
		}

		return result;
	},
};

export default HandComputers;
