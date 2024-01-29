import HandComputers from "./hand";
import { type Round } from "../reducers/game";

const computeScore = (round: Round) => {
	return HandComputers.score(round.hand);
};

const computeBonusId = (round: Round) => {
	if (!round.isValidated) {
		return null;
	}
	return HandComputers.bonusId(round.hand);
};

const RoundComputers = {
	score: computeScore,
	bonusId: computeBonusId,
};

export default RoundComputers;
