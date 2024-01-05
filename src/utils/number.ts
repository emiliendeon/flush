export const NUMBER_PLACEHOLDER = "--";

const NumberUtils = {
	format: (n: number | null) => {
		if (!Number.isFinite(n)) {
			return NUMBER_PLACEHOLDER;
		}
		return n!.toLocaleString();
	},
};

export default NumberUtils;
