import "./diceRoller.scss";

import { type DiceHand, type DiceValue } from "../../types/dice";
import { useEffect, useMemo, useState } from "react";
import Button from "../form/button/Button";
import Dice from "../dice/Dice";

type DiceRollerProps = {
	diceCount: number;
	maxRerollsCount?: number;
	disabled?: boolean;
	value?: DiceHand;
	onChange: (hand: DiceHand) => void;
	onValidate: () => void;
	resetKey?: number;
};

type DiceState = {
	value?: DiceValue;
	locked: boolean;
};

const DiceRoller = ({
	diceCount,
	maxRerollsCount,
	disabled,
	value,
	onChange,
	onValidate,
	resetKey,
}: DiceRollerProps) => {
	const [diceStates, setDiceStates] = useState<DiceState[]>(
		Array.from({ length: diceCount }, () => ({ locked: false }))
	);
	const [rerollsCount, setRerollsCount] = useState(-1);

	const diceStatesComputed = useMemo(() => {
		if (value) {
			return diceStates.map((diceState, i) => ({ ...diceState, value: value[i] }));
		}
		return diceStates;
	}, [diceStates, value]);

	const isRerollingOver = useMemo(() => {
		return maxRerollsCount !== undefined && rerollsCount >= maxRerollsCount;
	}, [maxRerollsCount, rerollsCount]);

	useEffect(() => {
		if (isRerollingOver) {
			onValidate();
		}
	}, [isRerollingOver]);

	useEffect(() => {
		if (resetKey !== undefined) {
			setDiceStates((prev) => prev.map((diceState) => ({ ...diceState, locked: false })));
			setRerollsCount(-1);
		}
	}, [resetKey]);

	const onDiceClick = (diceIndex: number) => {
		if (rerollsCount >= 0) {
			setDiceStates((prev) =>
				prev.map((diceState, index) =>
					index === diceIndex ? { ...diceState, locked: !diceState.locked } : diceState
				)
			);
		}
	};

	const onRoll = () => {
		onChange(
			diceStatesComputed.map(
				(diceState) =>
					(diceState.locked
						? diceState.value
						: Math.floor(Math.random() * 6)) as DiceValue
			)
		);
		setRerollsCount((prev) => prev + 1);
	};

	return (
		<div className="dice-roller">
			<div className="dice-row">
				{Array.from({ length: diceCount }, (_v, k) => (
					<Dice
						key={k}
						value={diceStatesComputed[k].value}
						locked={diceStatesComputed[k].locked || disabled || isRerollingOver}
						disabled={disabled || isRerollingOver}
						onClick={() => {
							onDiceClick(k);
						}}
					/>
				))}
			</div>
			<div className="actions">
				<Button label="Lancer" disabled={disabled || isRerollingOver} onClick={onRoll} />
				<Button
					label="Valider"
					disabled={disabled || rerollsCount === -1}
					onClick={onValidate}
				/>
			</div>
		</div>
	);
};

export default DiceRoller;
