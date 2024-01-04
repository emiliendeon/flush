import "./button.scss";

import clsx from "clsx";

export type ButtonProps = {
	label: string;
	disabled?: boolean;
	onClick?: () => void;
};

const Button = ({ label, disabled, onClick }: ButtonProps) => {
	const onLocalClick = () => {
		if (!disabled) {
			onClick?.();
		}
	};

	return (
		<button
			className={clsx("button", { disabled })}
			type="button"
			disabled={disabled}
			onClick={onLocalClick}
		>
			{label}
		</button>
	);
};

export default Button;
