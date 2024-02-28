const NUMBER_PLACEHOLDER = "--";

const NumberUtils = {
	safeFloor: (n: number) => Math.floor(n + Number.EPSILON),

	safeRoundUpper: (n: number) => Math.round(n + Number.EPSILON),

	format: (n: number | null | undefined) => {
		if (!Number.isFinite(n)) {
			if (n === Infinity) {
				return "\u221e";
			}
			return NUMBER_PLACEHOLDER;
		}
		return n!.toLocaleString();
	},
};

export default NumberUtils;
