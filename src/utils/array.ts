const ArrayUtils = {
	count: <T = any>(a: T[], predicate: (value: T) => boolean) => {
		return a.filter(predicate).length;
	},
};

export default ArrayUtils;
