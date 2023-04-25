function registerInput(n, v) {
	/**
	 * This function accepts the data, pointer, and value as arguments and returns
	 * the data updated to include the value
	 */
	// pointer is the index of element which has the class name of "pointer"
	const pointer = n.findIndex((x) => x.props.className.includes("pointer")),
		// val checks the value of v and if necessary, creates an element to insert into the data
		val = /^\^$/m.test(v)
			? createElement("sup", { className: "start" }, <></>)
			: v.slice(1).length
			? createElement("sup", { className: "startend" }, v.slice(1))
			: v;

	if (pointer === n.length - 1) {
	} else {
	}
}
