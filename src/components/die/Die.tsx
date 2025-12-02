import "./die.scss";

import { type DieValue } from "../../types/die";
import clsx from "clsx";
import { useMemo } from "react";

type DieProps = {
	value?: DieValue;
	locked?: boolean;
	disabled?: boolean;
	onClick?: () => void;
};

type Text = { content: string; color: string };

const ValueToText: { [K in DieValue]: Text } = [
	{ content: "9♣", color: "black" },
	{ content: "10♥", color: "red" },
	{ content: "V♠", color: "black" },
	{ content: "D♦", color: "red" },
	{ content: "R♣", color: "black" },
	{ content: "A♥", color: "red" },
];

const DefaultText: Text = { content: "?", color: "gray" };

const Die = ({ value, locked, disabled, onClick }: DieProps) => {
	const isDisabled = useMemo(() => {
		return disabled || value === undefined;
	}, [disabled, value]);

	const label = useMemo(() => {
		if (locked) {
			return "Déverrouiller";
		}
		return "Verrouiller";
	}, [locked]);

	const text = useMemo(() => {
		if (value === undefined) {
			return DefaultText;
		}
		return ValueToText[value];
	}, [value]);

	const onLocalClick = () => {
		if (!isDisabled) {
			onClick?.();
		}
	};

	return (
		<div
			className={clsx("die", text.color, {
				locked,
				disabled: isDisabled,
			})}
			role="button"
			aria-label={label}
			aria-disabled={isDisabled}
			onClick={onLocalClick}
		>
			<div className="content">{text.content}</div>
		</div>
	);
};

export default Die;
