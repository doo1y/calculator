const constructEvalExpr = (inputData, vars) => {
	return inputData.map(([v, p], i) => {
		if (/^[A-Z]*$/.test(v) && v.length > 0) {
			const variable = vars.find((el) => el.id === v);
			if (!variable) {
				return 0;
			} else return variable.content;
		} else if (v === "e") return Math.E;
		else if (v === "ln(") return `log(`;
		else if (v === "log(") return "log10(";
		// else if (isValidElement(v) && v.props.className === "logValue") {
		// 	return log(v.props.children[3][0], v.props.children[1].props.children[0]);
		// }
		else if (p === "sup" || p === "supPointer") {
			const recursedExpValue = constructEvalExpr(v, vars);
			let recursedExpValStringified = recursedExpValue.join("");

			return `^(${recursedExpValStringified})`;
		}
		return v;
	});
};

export default constructEvalExpr;
