const insertExp = (data, val) => {
	const pointer = data.findIndex(
		([v, p]) => p === "supPointer" || p === "pointer"
	);

	// the value that will be inserted into the inputData:
	let supData =
		// if the value that is being replaced is an subarray
		data[pointer][1] === "supPointer"
			? // recurse into the array and insert the value, and then return that subarray
			  insertExp(data[pointer][0], val)
			: val.slice(1)
			? [val.slice(1), ""]
			: [null, "pointer"];

	if (pointer === data.length - 1) {
		if (supData[1] === "pointer") {
			let newData = data.toSpliced(pointer, 1, [[supData], "supPointer"]);
			return newData;
		} else return data.toSpliced(pointer, 0, [[supData], "sup"]);
	} else {
		let newData = data.toSpliced(pointer, 1, [[supData], "sup"]);
		newData[pointer + 1][1] = "pointer";
		return newData;
	}
};

export default insertExp;

/**
 * [ [ 1, "" ], [ 2, "" ], [ [ 1, "" ], [ 2, "" ], [ 3, "pointer" ] , "supPointer" ] ]
 * 12^12[3]
 *
 * [ [ 1, "" ], [ 2, "" ], [ [ 1, "" ], [ 2, "" ], [ 3, "" ] , "sup" ], [null, "pointer"] ]
 * 12^(123sup)[]
 */
