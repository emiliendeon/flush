import "./instruction.scss";

import { type PropsWithChildren } from "react";
import { useSelector } from "../../store";

type InstructionProps = PropsWithChildren<{
	visible?: boolean;
}>;

const Instruction = ({ visible, children }: InstructionProps) => {
	const { showInstructions } = useSelector((state) => state.settings);

	if (!(showInstructions && visible)) {
		return null;
	}

	return <div className="instruction">{children}</div>;
};

export default Instruction;
