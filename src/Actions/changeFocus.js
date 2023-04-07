function changeFocus(arr) {
	const idx = arr.findIndex(([v, p]) => p === "pointer");
	if (idx >= 0) {
		arr[idx][1] = "";
	} else arr[arr.length - 1][1] = "pointer";
	return arr;
}

export default changeFocus;
