import "./bonuses.scss";

import { BonusIds, Bonuses as GameBonuses } from "../../../utils/game";

import GameSelectors from "../../../selectors/game";
import NumberUtils from "../../../utils/number";
import { useMemo } from "react";
import { useSelector } from "../../../store";

const Bonuses = () => {
	const { bonuses } = useSelector(GameSelectors.result);

	const bonusesComputed = useMemo(() => {
		return BonusIds.map((bonusId) => ({
			id: bonusId,
			label: GameBonuses[bonusId].label,
			value: GameBonuses[bonusId].value,
			count: bonuses.combinations[bonusId]?.count ?? 0,
			total: bonuses.combinations[bonusId]?.total ?? 0,
		}));
	}, [bonuses]);

	return (
		<div className="bonuses">
			<table>
				<caption>Bonus</caption>
				<tbody>
					{bonusesComputed.map((bonus) => (
						<tr key={bonus.id}>
							<th scope="row">{bonus.label}</th>
							<td>{NumberUtils.format(bonus.value)}</td>
							<td>{NumberUtils.format(bonus.count)}</td>
							<td>{NumberUtils.format(bonus.total)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Bonuses;
