import "./button.scss";

export type ButtonProps = {
	label: string;
	onClick?: () => void;
};

const Button = ({ label, onClick }: ButtonProps) => {
	return (
		<button className="button" type="button" onClick={onClick}>
			{label}
		</button>
	);
};

export default Button;
