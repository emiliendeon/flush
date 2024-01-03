import "./diceRoller.scss";

import Dice, { type DiceProps } from "../dice/Dice";
import Button from "../form/button/Button";
import { useState } from "react";

type DiceRollerProps = {
	diceCount: number;
};

const DiceRoller = ({ diceCount }: DiceRollerProps) => {
	const [values, setValues] = useState<Array<DiceProps["value"]>>(
		Array.from({ length: diceCount }, () => undefined)
	);

	const onRoll = () => {
		setValues(
			Array.from(
				{ length: diceCount },
				() => Math.floor(Math.random() * 6) as DiceProps["value"]
			)
		);
	};

	return (
		<div className="dice-roller">
			<div className="dice-row">
				{Array.from({ length: diceCount }, (_v, k) => (
					<Dice key={k} value={values[k]} />
				))}
			</div>
			<Button label="Lancer" onClick={onRoll} />
		</div>
	);
};

export default DiceRoller;
