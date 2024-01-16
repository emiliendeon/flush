import "./button.scss";

import clsx from "clsx";

type ButtonProps = {
	label: string;
	description?: string;
	disabled?: boolean;
	onClick?: () => void;
};

const Button = ({ label, description, disabled, onClick }: ButtonProps) => {
	const onLocalClick = () => {
		if (!disabled) {
			onClick?.();
		}
	};

	return (
		<button
			className={clsx("button", { "has-description": description, disabled })}
			type="button"
			disabled={disabled}
			onClick={onLocalClick}
		>
			<div className="label">{label}</div>
			{description && <div className="description">{description}</div>}
		</button>
	);
};

export default Button;
