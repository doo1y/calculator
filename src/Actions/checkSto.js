import { isValidElement } from "react";
const checkSto = (inputData) => {
	const stoIdx = inputData.findIndex(
			([v, p]) =>
				isValidElement(v) && v.props.className.split(" ").includes("sto")
		),
		a = inputData.slice(0, stoIdx),
		b = inputData.slice(stoIdx + 1),
		aMap = a.map(([v, p]) => {
			if (v === "ln(") return `log(`;
			// else if (isValidElement(v) && v.props.className === "logValue") {
			// 	return log(
			// 		v.props.children[3][0],
			// 		v.props.children[1].props.children[0]
			// 	);
			// } else if (v.type === "sup") {
			// 	switch (v.props.className) {
			// 		case "startexp":
			// 			return "^(";
			// 		case "startend":
			// 			return `^(${v.props.children})`;
			// 		case "start":
			// 			return `^(${v.props.children}`;
			// 		case "mid":
			// 			return `${v.props.children}`;
			// 		case "end":
			// 			return `)`;
			// 	}
			// } else if (isValidElement(v) && !v.props.children) return;
			// else if (isValidElement(v)) return "";
			return v;
		}),
		bMap = b.map(([v, p]) => {
			if (/^[A-Z]*$/.test(v) && v.length > 0) return v;
			else if (!v) return "";
			throw new TypeError();
		});
	return [aMap, bMap];
};

export default checkSto;
