// import { createElement, isValidElement } from "react";
// function registerInput(n, p, v) {
// 	if (v === "^") {
// 		let val = createElement("sup", { className: "startexp" });
// 		n[p] = [val, ""];
// 		n.push([<sup className='end'>&nbsp;&nbsp;</sup>, "pointer"]);
// 		n.push([<span>&nbsp;&nbsp;</span>, ""]);
// 		return n;
// 	}
// 	let val = ["^2", "^-1", "^3"].includes(v)
// 		? createElement("sup", { className: "startend" }, v.slice(1))
// 		: v;
// 	if (isValidElement(n[p][0]) && n[p][0].type === "sup") {
// 		if (n[p][0].props.className === "startend") {
// 			val = <sup className='start'>{val}</sup>;
// 		} else if (n[p][0].props.className === "end") {
// 			val = <sup className='mid'>{val}</sup>;
// 		}
// 		n[p] = [val, ""];
// 		if (p === n.length - 1)
// 			n.push([<sup className='end'>&nbsp;&nbsp;</sup>, "pointer"]);
// 		else
// 			n.splice(p + 1, 0, [<sup className='end'>&nbsp;&nbsp;</sup>, "pointer"]);
// 	} else if (isValidElement(n[p][0]) && n[p][0].type === "sub") {
// 		val = <sub>{val}</sub>;
// 		n[p] = [val, ""];
// 		if (p === n.length - 1) n.push([<sub>&nbsp;&nbsp;</sub>, "pointer"]);
// 		else n[p + 1] = [<sub>{n[p + 1][0]}</sub>, "pointer"];
// 	} else {
// 		n[p] = [val, ""];
// 		if (p === n.length - 1) n.push([<span>&nbsp;&nbsp;</span>, "pointer"]);
// 		else n[p + 1] = [n[p + 1][0], "pointer"];
// 	}
// 	return n;
// }
import { createElement, isValidElement } from "react";
import { rightClick } from "./leftRight";

const updateDataList = (data, val) => {
	const pointer = data.findIndex(
		([value, pointer]) => pointer === "supPointer" || pointer === "pointer"
	);
	// if the pointer value is "subPointer", the pointer is inside, so change the value from within inside
	let supData;
	if (data[pointer][1] === "supPointer") {
		if (val === "sto") return data;
		supData = updateDataList(data[pointer][0], val);
	}

	if (supData) {
		return data.toSpliced(pointer, 1, [supData, "supPointer"]);
	}

	if (pointer === data.length - 1) {
		let updatedData = data.toSpliced(pointer, 1, [val, ""]);
		updatedData.push([null, "pointer"]);
		return updatedData;
	}
	let newData = data.toSpliced(pointer, 1, [val, "pointer"]);

	return rightClick(newData);
};

const recursiveIndexFinder = (data) => {
	data.findIndex(([value, pointer]) => {
		if (pointer === "supPointer") {
			return recursiveIndexFinder(value);
		}
		if (pointer === "pointer") return true;
	});
};
export default updateDataList;
