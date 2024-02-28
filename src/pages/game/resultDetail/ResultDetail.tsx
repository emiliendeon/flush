import "./resultDetail.scss";

import BooleanUtils from "../../../utils/boolean";
import GameSelectors from "../../../selectors/game";
import NumberUtils from "../../../utils/number";
import { useSelector } from "../../../store";

const ResultDetail = () => {
	const { isDealAccepted } = useSelector((state) => state.game);
	const { bonuses, rawFinalScore, finalScore } = useSelector(GameSelectors.result);

	return (
		<div className="result-detail">
			<table>
				<tbody>
					<tr>
						<th scope="row">Compromis accepté ?</th>
						<td>{BooleanUtils.format(isDealAccepted)}</td>
					</tr>
					<tr>
						<th scope="row">Score sans bonus</th>
						<td>{NumberUtils.format(rawFinalScore)}</td>
					</tr>
					<tr>
						<th scope="row">Bonus</th>
						<td>{NumberUtils.format(bonuses.total)}</td>
					</tr>
					<tr>
						<th scope="row">Score final</th>
						<td>{NumberUtils.format(finalScore)}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default ResultDetail;
