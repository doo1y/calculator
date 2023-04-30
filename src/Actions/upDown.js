import { mathView } from "../exports/mathView";

const upDownOnMath = (e, pointer) => {
	let newData;
	const len = mathView[pointer[0]].v.length,
		idx = Array.prototype.findIndex.call(
			mathView[pointer[0]].v,
			(x, i) => Object.keys(x)[0] === pointer[1]
		);
	switch (e.currentTarget.value) {
		case "down":
			if (idx < len - 1)
				newData = [pointer[0], Object.keys(mathView[0].v[idx + 1])[0]];
			else newData = [pointer[0], Object.keys(mathView[0].v[0])[0]];
			break;
		case "up":
			if (idx > 0)
				newData = [pointer[0], Object.keys(mathView[0].v[idx - 1])[0]];
			else newData = [pointer[0], Object.keys(mathView[0].v[len - 1])[0]];
			break;
	}
	return newData;
};

export function upDownOnStat(e, inputData) {
	let focused = inputData.findIndex(([x, p], i) => p === "focused"),
		pointer = inputData[focused][0].findIndex(([y, z], i) => z === "pointer"),
		newData = inputData.toSpliced(focused, 1, [
			inputData[focused][0].toSpliced(pointer, 1, [
				inputData[focused][0][pointer][0],
				"",
			]),
			"focused",
		]);
	switch (e.currentTarget.value) {
		case "up":
			if (pointer === 0) {
				newData[focused][0][newData[focused][0].length - 1][1] = "pointer";
			} else newData[focused][0][pointer - 1][1] = "pointer";
			break;
		case "down":
			if (pointer === newData[focused][0].length - 1) {
				newData[focused][0][0][1] = "pointer";
			} else newData[focused][0][pointer + 1][1] = "pointer";
			break;
	}
	return newData;
}

const upDownOnWindowAndYPlot = (e, inputData) => {
	let currFocus = inputData.findIndex(([x, p], i) => p === "focused"),
		currPointer = inputData[currFocus][0].findIndex(
			([x, p], i) => p === "pointer"
		),
		newData = inputData.toSpliced(currFocus, 1, [
			inputData[currFocus][0],
			"",
			inputData[currFocus][2],
		]),
		pointer = -1;
	if (currPointer >= 0) newData[currFocus][0][currPointer][1] = "";

	switch (e.currentTarget.value) {
		case "up":
			if (currFocus === 0) {
				newData[newData.length - 1][1] = "focused";
				if (currPointer >= 0) newData[newData.length - 1][0][0][1] = "pointer";
				else pointer = newData.length - 1;
				break;
			}
			newData[currFocus - 1][1] = "focused";
			if (currPointer >= 0) newData[currFocus - 1][0][0][1] = "pointer";
			else pointer = currFocus - 1;
			break;
		case "down":
			if (currFocus === newData.length - 1) {
				newData[0][1] = "focused";
				if (currPointer >= 0) newData[0][0][0][1] = "pointer";
				else pointer = 0;
				break;
			}
			newData[currFocus + 1][1] = "focused";
			if (currPointer >= 0) newData[currFocus + 1][0][0][1] = "pointer";
			else pointer = currFocus + 1;
			break;
	}
	return [newData, pointer];
};

export { upDownOnMath, upDownOnWindowAndYPlot };
