import "./diceRoller.scss";

import Dice, { type DiceProps } from "../dice/Dice";
import { useMemo, useState } from "react";
import Button from "../form/button/Button";

type DiceRollerProps = {
	diceCount: number;
	maxRerollsCount?: number;
};

type DiceState = {
	value: DiceProps["value"];
	locked: boolean;
};

const DiceRoller = ({ diceCount, maxRerollsCount }: DiceRollerProps) => {
	const [diceStates, setDiceStates] = useState<DiceState[]>(
		Array.from({ length: diceCount }, () => ({ value: undefined, locked: false }))
	);
	const [rerollsCount, setRerollsCount] = useState(-1);

	const isRerollingOver = useMemo(() => {
		return maxRerollsCount !== undefined && rerollsCount >= maxRerollsCount;
	}, [maxRerollsCount, rerollsCount]);

	const onDiceClick = (diceIndex: number) => {
		if (!isRerollingOver) {
			setDiceStates((prev) =>
				prev.map((diceState, index) =>
					index === diceIndex && diceState.value !== undefined
						? { ...diceState, locked: !diceState.locked }
						: diceState
				)
			);
		}
	};

	const onRoll = () => {
		if (!isRerollingOver) {
			setRerollsCount((prev) => prev + 1);
			setDiceStates((prev) =>
				prev.map((diceState) =>
					diceState.locked
						? diceState
						: {
								...diceState,
								value: Math.floor(Math.random() * 6) as DiceProps["value"],
							}
				)
			);
		}
	};

	return (
		<div className="dice-roller">
			<div className="dice-row">
				{Array.from({ length: diceCount }, (_v, k) => (
					<Dice
						key={k}
						value={diceStates[k].value}
						locked={diceStates[k].locked || isRerollingOver}
						disabled={isRerollingOver}
						onClick={() => {
							onDiceClick(k);
						}}
					/>
				))}
			</div>
			<Button label="Lancer" onClick={onRoll} disabled={isRerollingOver} />
		</div>
	);
};

export default DiceRoller;
