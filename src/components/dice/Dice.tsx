import "./dice.scss";

import clsx from "clsx";
import { useMemo } from "react";

export type DiceProps = {
	value?: 0 | 1 | 2 | 3 | 4 | 5;
};

type Text = { content: string; color: string };

const ValueToText: { [K in NonNullable<DiceProps["value"]>]: Text } = [
	{ content: "9♣", color: "black" },
	{ content: "10♥", color: "red" },
	{ content: "V♠", color: "black" },
	{ content: "D♦", color: "red" },
	{ content: "R♣", color: "black" },
	{ content: "A♥", color: "red" },
];

const DefaultText: Text = { content: "?", color: "gray" };

const Dice = ({ value }: DiceProps) => {
	const text = useMemo(() => {
		if (value === undefined) {
			return DefaultText;
		}
		return ValueToText[value];
	}, [value]);

	return (
		<div className={clsx("dice", text.color)}>
			<div className="content">{text.content}</div>
		</div>
	);
};

export default Dice;
