const BOOLEAN_PLACEHOLDER = "--";

const BooleanUtils = {
	format: (b: boolean | null | undefined) => {
		if (b === null || b === undefined) {
			return BOOLEAN_PLACEHOLDER;
		}
		return b ? "Oui" : "Non";
	},
};

export default BooleanUtils;
