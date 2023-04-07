function delVal(n, p) {
	if (p === n.length - 1) {
		n.splice(p - 1, 1);
	} else if (p !== n.length - 1) {
		n[p - 1][1] = "pointer";
		n.splice(p, 1);
	}
	return n;
}

export default delVal;
