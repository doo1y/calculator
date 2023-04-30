export const delInputData = (inputData, modes = 0, lvl = 0) => {
	/**
	 * This function accepts an data in the form of an array, and an modes
	 * identifier in the form of an number
	 *
	 * Returns a new data array with the value that pointer was focused on deleted
	 * The value deleted depends on the mode number that is provided
	 */
	let inputDataDeleted, fIdx, pIdx, nestedInputData;
	switch (modes) {
		case 0:
			pIdx = inputData.findIndex(
				([x, p]) => p === "pointer" || p === "supPointer"
			);
			if (inputData[pIdx][1] === "supPointer")
				nestedInputData = delInputData(inputData[pIdx][0]);

			if (nestedInputData) {
				inputDataDeleted = inputData.toSpliced(pIdx, 1, [
					nestedInputData,
					"supPointer",
				]);
			} else {
				if (!inputData[pIdx][0] && pIdx > 0) {
					inputDataDeleted = inputData.toSpliced(pIdx - 1, 1);
				} else {
					inputDataDeleted = inputData.toSpliced(pIdx, 1);
					if (!inputDataDeleted[pIdx]) inputDataDeleted.push([null, ""]);
					inputDataDeleted[pIdx][1] = "pointer";
				}
			}

			break;
		case 1:
			fIdx = inputData.findIndex(([x, p]) => p === "focused");
			pIdx = inputData[fIdx][0].findIndex(
				([x, p]) => p === "pointer" || p === "supPointer"
			);

			if (inputData[fIdx][0]) {
				if (inputData[fIdx][0][pIdx][1] === "supPointer")
					nestedInputData = delInputData(inputData[fIdx][0][pIdx][0]);
				if (nestedInputData) {
					inputDataDeleted = inputData.toSpliced(fIdx, 1, [
						inputData[fIdx][0].toSpliced(pIdx, 1, [
							nestedInputData,
							"supPointer",
						]),
						"focused",
					]);
				} else {
					if (!inputData[fIdx][0][pIdx][0] && pIdx > 0) {
						inputDataDeleted = inputData.toSpliced(fIdx, 1, [
							inputData[fIdx][0].toSpliced(pIdx - 1, 1),
							"focused",
						]);
					} else {
						inputDataDeleted = inputData.toSpliced(fIdx, 1, [
							inputData[fIdx][0].toSpliced(pIdx, 1),
							"focused",
						]);
						if (!inputDataDeleted[fIdx][0][pIdx])
							inputDataDeleted[fIdx][0].push([null, ""]);
						inputDataDeleted[fIdx][0][pIdx][1] = "pointer";
					}
				}
			}
			break;
	}
	return inputDataDeleted;
};
