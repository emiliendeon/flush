import "./instruction.scss";

import { type PropsWithChildren } from "react";

type InstructionProps = PropsWithChildren<{
	visible?: boolean;
}>;

const Instruction = ({ visible, children }: InstructionProps) => {
	if (!visible) {
		return null;
	}

	return <div className="instruction">{children}</div>;
};

export default Instruction;
