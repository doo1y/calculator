import { createElement, isValidElement } from "react";
function registerInput(n, p, v) {
	let val =
		v === "^2" || v === "^-1"
			? createElement("sup", { className: "startend" }, v.slice(1))
			: v;
	if (isValidElement(n[p][0]) && n[p][0].type === "sup") {
		console.log("sup");
		if (n[p][0].props.className === "startend") {
			console.log("sup");
			val = <sup className='start'>{val}</sup>;
		} else if (n[p][0].props.className === "end") {
			val = <sup className='mid'>{val}</sup>;
		}
		n[p] = [val, ""];
		if (p === n.length - 1)
			n.push([<sup className='end'>&nbsp;&nbsp;</sup>, "pointer"]);
		else
			n.splice(p + 1, 0, [<sup className='end'>&nbsp;&nbsp;</sup>, "pointer"]);
	} else if (isValidElement(n[p][0]) && n[p][0].type === "sub") {
		val = <sub>{val}</sub>;
		n[p] = [val, ""];
		if (p === n.length - 1) n.push([<sub>&nbsp;&nbsp;</sub>, "pointer"]);
		else n[p + 1] = [<sub>{n[p + 1][0]}</sub>, "pointer"];
	} else {
		n[p] = [val, ""];
		if (p === n.length - 1) n.push([<span>&nbsp;&nbsp;</span>, "pointer"]);
		else n[p + 1] = [n[p + 1][0], "pointer"];
	}
	return n;
}

export default registerInput;
