import { mathView } from "../exports/mathView";
const selectMathFuncItem = (pointer) => {
	const idx = Array.prototype.findIndex.call(
		mathView[pointer[0]].v,
		(x, i) => Object.keys(x)[0] === pointer[1]
	);
	return mathView[pointer[0]].v[idx].value;
};

export default selectMathFuncItem;
