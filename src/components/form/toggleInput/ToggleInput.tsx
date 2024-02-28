import "./toggleInput.scss";

import clsx from "clsx";

type ToggleInputProps = {
	label: string;
	value: boolean;
	onChange: (value: boolean) => void;
};

const ToggleInput = ({ label, value, onChange }: ToggleInputProps) => {
	const onLocalChange = () => {
		onChange(!value);
	};

	return (
		<label className={clsx("toggle-input", { checked: value })}>
			<input className="ghost" type="checkbox" checked={value} onChange={onLocalChange} />
			<div className="input" aria-hidden></div>
			<div className="label">{label}</div>
		</label>
	);
};

export default ToggleInput;
