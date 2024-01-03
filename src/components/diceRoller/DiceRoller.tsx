import "./diceRoller.scss";

import Dice, { type DiceProps } from "../dice/Dice";
import Button from "../form/button/Button";
import { useState } from "react";

type DiceRollerProps = {
	diceCount: number;
};

type DiceState = {
	value: DiceProps["value"];
	locked: boolean;
};

const DiceRoller = ({ diceCount }: DiceRollerProps) => {
	const [diceStates, setDiceStates] = useState<DiceState[]>(
		Array.from({ length: diceCount }, () => ({ value: undefined, locked: false }))
	);

	const onDiceClick = (diceIndex: number) => {
		setDiceStates((prev) =>
			prev.map((diceState, index) =>
				index === diceIndex && diceState.value !== undefined
					? { ...diceState, locked: !diceState.locked }
					: diceState
			)
		);
	};

	const onRoll = () => {
		setDiceStates((prev) =>
			prev.map((diceState) =>
				diceState.locked
					? diceState
					: { ...diceState, value: Math.floor(Math.random() * 6) as DiceProps["value"] }
			)
		);
	};

	return (
		<div className="dice-roller">
			<div className="dice-row">
				{Array.from({ length: diceCount }, (_v, k) => (
					<Dice
						key={k}
						value={diceStates[k].value}
						locked={diceStates[k].locked}
						onClick={() => {
							onDiceClick(k);
						}}
					/>
				))}
			</div>
			<Button label="Lancer" onClick={onRoll} />
		</div>
	);
};

export default DiceRoller;
