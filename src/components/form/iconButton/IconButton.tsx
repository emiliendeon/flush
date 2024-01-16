import "./iconButton.scss";

import clsx from "clsx";

type IconButtonProps = {
	icon: "close";
	label: string;
	disabled?: boolean;
	onClick?: () => void;
};

const IconButton = ({ icon, label, disabled, onClick }: IconButtonProps) => {
	const onLocalClick = () => {
		if (!disabled) {
			onClick?.();
		}
	};

	return (
		<button
			className={clsx("icon-button", icon, { disabled })}
			type="button"
			aria-label={label}
			disabled={disabled}
			onClick={onLocalClick}
		>
			<img className="icon" src={`/assets/icons/${icon}.png`} alt={label} />
		</button>
	);
};

export default IconButton;
