import "./score.scss";

import GameSelectors from "../../../selectors/game";
import NumberUtils from "../../../utils/number";
import { useSelector } from "../../../store";

type ScoreProps = {
	roundIndex: number;
};

const Score = ({ roundIndex }: ScoreProps) => {
	const score = useSelector((state) => GameSelectors.score(state, roundIndex));

	return <div className="score">{NumberUtils.format(score)}</div>;
};

export default Score;
