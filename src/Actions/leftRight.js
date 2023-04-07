// function which handles how the pointer should be moved, left or right
function leftRight(d, n, p) {
	n[p][1] = "";
	if (d === "left") n[p - 1][1] = "pointer";
	else n[p + 1][1] = "pointer";
	return n;
}

export default leftRight;
