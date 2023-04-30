// // function which handles how the pointer should be moved, left or right
// function leftRight(d, n, p) {
// 	n[p][1] = "";
// 	if (d === "left") n[p - 1][1] = "pointer";
// 	else n[p + 1][1] = "pointer";
// 	return n;
// }

export function leftClickStatMode(inputData) {
	const focusedIndex = inputData.findIndex(([x, p]) => p === "focused"),
		pointer = inputData[focusedIndex][0].findIndex(
			([y, z], i) => z === "pointer"
		),
		newData = inputData.toSpliced(focusedIndex, 1, [
			inputData[focusedIndex][0].toSpliced(pointer, 1, [
				inputData[focusedIndex][0][pointer][0],
				"",
			]),
			"",
		]);
	newData[focusedIndex][0][0][1] = "";
	if (focusedIndex === 0) {
		newData[2][1] = "focused";
		newData[2][0][0][1] = "pointer";
	} else {
		newData[focusedIndex - 1][1] = "focused";
		newData[focusedIndex - 1][0][0][1] = "pointer";
	}
	return newData;
}

export function rightClickStatMode(inputData) {
	const focusedIndex = inputData.findIndex(([x, p]) => p === "focused"),
		pointer = inputData[focusedIndex][0].findIndex(
			([y, z], i) => z === "pointer"
		),
		newData = inputData.toSpliced(focusedIndex, 1, [
			inputData[focusedIndex][0].toSpliced(pointer, 1, [
				inputData[focusedIndex][0][pointer][0],
				"",
			]),
			"",
		]);
	newData[focusedIndex][0][0][1] = "";
	if (focusedIndex === 2) {
		newData[0][1] = "focused";
		newData[0][0][0][1] = "pointer";
	} else {
		newData[focusedIndex + 1][1] = "focused";
		newData[focusedIndex + 1][0][0][1] = "pointer";
	}
	return newData;
}

export function leftClick(data, lvl = 0) {
	let pointer = data.findIndex(([val, p]) => p === "pointer"),
		supPointer = data.findIndex(([val, p]) => p === "supPointer"),
		newData = data,
		supData =
			supPointer >= 0 ? leftClick(newData[supPointer][0], lvl + 1) : null;

	// if pointer is already at the start and level of recursion is at 0,
	if (!lvl && !pointer) return newData; // return the data as it is

	// if pointer is at the start, but it is in a nested state, remove the pointer and return newData
	if (!pointer && lvl) {
		newData = newData.toSpliced(pointer, 1, [newData[pointer][0], ""]);
		return newData;
	}
	// Condition: if recursion happened
	if (supData) {
		// if there is a "pointer" inside supData, then update the array value without changing "supPointer"
		if (supData.findIndex(([v, p]) => p === "pointer") >= 0) {
			newData = data.toSpliced(supPointer, 1, [supData, data[supPointer][1]]);
		}
		// if there is no pointer inside "supData" change "supPointer" to "sup"
		else {
			// [[1, ""], [[[2, ""], [[[3, ""], [4, ""]], "sup"]],"supPointer"], ["null", ""]]
			newData = newData.toSpliced(supPointer, 1, [supData, "sup"]);
			if (newData[supPointer - 1][1] === "sup") {
				if (!newData[supPointer - 1][0].length)
					newData[supPointer - 1][0].push([null, "pointer"]);
				else recurseIntoSupEnd(newData[supPointer - 1][0]);
				newData[pointer - 1][1] = "supPointer";
			} else newData[supPointer - 1][1] = "pointer";
		}
		return newData;
	}

	// base condition: index is not at the beginning
	if (pointer > 0) {
		// if it is an empty value, that means we are moving from the very end
		if (!newData[pointer][0]) {
			newData = newData.toSpliced(pointer, 1);
		} else {
			// if it not an empty value
			newData = newData.toSpliced(pointer, 1, [newData[pointer][0], ""]);
		}
		if (newData[pointer - 1][1] === "sup") {
			if (!newData[pointer - 1][0].length)
				newData[pointer - 1][0].push([null, "pointer"]);
			else recurseIntoSupEnd(newData[pointer - 1][0]);
			newData[pointer - 1][1] = "supPointer";
		} else newData[pointer - 1][1] = "pointer";
	}
	return newData;

	// this is an example of the value that we get back
	// [[1, ""], [[[2, ""], [[[3, ""], [4, ""]], "supPointer"]],"supPointer"], ["null", ""]]
	// coming out of recursion, where recursion occured more than once

	// // Condition: recursion occured
	// if (supData) {
	// 	// if "pointer" is already at index 0
	// 	// console.log(supData.findIndex(([val, pointer]) => pointer === "pointer"));
	// 	if (supData.findIndex(([val, pointer]) => pointer === "pointer") < 0) {
	// 		// remove "pointer" from index 0,
	// 		// update "supPointer" to "sup" since "pointer" no longer exists in the newsupData
	// 		newData = data.toSpliced(p, 1, [supData, "sup"]);
	// 		// assign "pointer" to index 1 of the array on the left of data[p]
	// 		newData[p - 1][1] = "pointer";
	// 		return newData;
	// 	}
	// 	// else, return the entire thing
	// 	return data.toSpliced(p, 1, [supData, "supPointer"]);
	// }
	if (pointer > 0) {
		if (!newData[pointer][0]) {
			newData = newData.toSpliced(pointer, 1);
		}
		newData = data.toSpliced(p, 1, [data[p][0], ""]);
		newData[p - 1][1] = "pointer";
	}
	return newData;
}

export function rightClick(data, lvl = 0) {
	let pointer = data.findIndex(([val, p]) => p === "pointer"),
		supPointer = data.findIndex(([val, p]) => p === "supPointer"),
		newData = data,
		supData =
			supPointer >= 0 ? rightClick(newData[supPointer][0], lvl + 1) : null;

	// if pointer is already at the end and the value is null and level of recursion is at 0
	if (pointer === data.length - 1 && !newData[pointer][0] && !lvl)
		return newData; // return the data as it is

	// else if pointer is at the end of the array, and the value is null, and the level of recursion is not at 0
	if (pointer === newData.length - 1 && !newData[pointer][0] && lvl) {
		newData = newData.toSpliced(pointer, 1);
		return newData;
	}

	// // EXAMPLE: [[1, ""], [[[2, ""], [[[3, ""], [4, "pointer"]], "supPointer"]],"supPointer"]]
	// if (pointer === newData.length - 1) {
	// 	// [[1, ""], [[[2, ""], [[[3, ""], [4, ""]], "supPointer"]],"supPointer"], ["null", ""]]
	// 	newData = newData.toSpliced(pointer, 1, [newData[pointer][0], ""]);
	// 	// if the value with "pointer" is not null, then push in a null with "pointer"
	// 	if (!newData[pointer + 1]) {
	// 		// [[1, ""], [[[2, ""], [[[3, ""], [4, ""], [null, "pointer"]], "supPointer"]],"supPointer"], ["null", ""]]
	// 		newData.push([null, "pointer"]);
	// 	} else {
	// 		newData.pop();
	//   }
	//   return
	// }

	// if recursion happened
	if (supData) {
		// if there is a "pointer" inside supData, then update the array value without changing "supPointer"
		if (supData.findIndex(([v, p]) => p === "pointer") >= 0) {
			newData = newData.toSpliced(supPointer, 1, [supData, "supPointer"]);
		}
		// if there is no pointer inside "supData" change "supPointer" to "sup"
		else {
			// [[1, ""], [[[2, ""], [[[3, ""], [4, ""]], "sup"]],"supPointer"], ["null", ""]]
			newData = newData.toSpliced(supPointer, 1, [supData, "sup"]);
			// if there is no more value that follows after stepping out of the recursion
			if (!newData[supPointer + 1]) {
				// then push in a null value
				newData.push([null, "pointer"]);
			}
			// if the value that follows after stepping out of the recursion happens to be another exponent
			else if (newData[supPointer + 1][1] === "sup") {
				if (!newData[supPointer + 1][0].length)
					newData[supPointer + 1][0].push([null, "pointer"]);
				// then recurse into it
				recurseIntoSupStart(newData[supPointer + 1][0]);
				newData[supPointer + 1][1] = "supPointer";
			} else if (newData[supPointer + 1][0]) {
				newData[supPointer + 1][1] = "pointer";
			}
			// if there is no more value after the "supPointer" array, push in a null with "pointer"
		}
		return newData;
	}

	// base case:
	if (pointer >= 0) {
		// if pointer is at the end and the value is not null
		if (pointer === data.length - 1 && newData[pointer][0]) {
			newData = newData.toSpliced(pointer, 1, [newData[pointer][0], ""]);
			newData.push([null, "pointer"]);
		} else {
			newData = newData.toSpliced(pointer, 1, [newData[pointer][0], ""]);
			if (newData[pointer + 1][1] === "sup") {
				if (!newData[pointer + 1][0].length)
					newData[pointer + 1][0].push([null, "pointer"]);
				else recurseIntoSupStart(newData[pointer + 1][0]);
				newData[pointer + 1][1] = "supPointer";
			} else {
				newData[pointer + 1][1] = "pointer";
			}
		}
	}

	// this is an example of the value that we get back
	// [[1, ""], [[[2, ""], [[[3, ""], [4, ""]], "supPointer"]],"supPointer"], ["null", ""]]
	// coming out of recursion, where recursion occured more than once

	// if (supData) {
	// 	// if "pointer" is already at index 0
	// 	if (supData.findIndex(([val, p]) => p === "pointer") < 0) {
	// 		// remove "pointer" from index 0,
	// 		// update "supPointer" to "sup" since "pointer" no longer exists in the newsupData
	// 		newData = data.toSpliced(pointer, 1, [supData, "sup"]);
	// 		// assign "pointer" to index 1 of the array on the left of data[p]
	// 		newData[pointer + 1][1] = "pointer";
	// 		return newData;
	// 	}
	// 	// else, return the entire thing
	// 	return data.toSpliced(pointer, 1, [supData, "supPointer"]);
	// }
	// else if (data[pointer][1] === "pointer" && data[pointer + 1][1] === "sup") {
	// 	newData = newData.toSpliced(pointer, 1, [newData[pointer][0], ""]);
	// 	newData[pointer + 1][1] = "supPointer";
	// 	newData[pointer + 1][0][0][1] = "pointer";
	// 	return newData;
	// } else {
	// 	if (pointer < newData.length - 1) {
	// 		newData = newData.toSpliced(pointer, 1, [newData[pointer][0], ""]);
	// 		newData[pointer + 1][1] = "pointer";
	// 		return newData;
	// 	} else if (lvl) {
	// 		return data.toSpliced(pointer, 1, [data[pointer][0], ""]);
	// 	}
	// }
	return newData;
}

function recurseIntoSupEnd(data) {
	if (data[data.length - 1][1] === "sup") {
		data.splice(data.length - 1, 1, [
			recurseIntoSupEnd(data[data.length - 1][0]),
			"supPointer",
		]);
	}
	data[data.length - 1][1] = "pointer";
	return;
}

function recurseIntoSupStart(data) {
	if (data[0][1] === "sup") {
		data.splice(0, 1, [recurseIntoSupStart(data[0][0]), "supPointer"]);
	}
	data[0][1] = "pointer";
	return;
}

// if the value at the end is
