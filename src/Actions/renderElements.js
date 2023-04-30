import { createElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
// function which outputs input to screen whenever valid button is clicked

const renderElements = (data, lvl = 0) => {
	return data.map(([element, pointer], i) => {
		let classNames = [];
		if (pointer) classNames.push(pointer);
		if (!element) {
			return (
				<span className={classNames.join(" ")} key={`${lvl}-${i}`}>
					&nbsp;&nbsp;
				</span>
			);
		}
		if (pointer === "supPointer" || pointer === "sup") {
			return (
				<sup className={classNames.join(" ")} key={`${lvl}-${i}`}>
					{renderElements(element, lvl + 1)}
				</sup>
			);
		}
		if (element === "sto")
			return <FontAwesomeIcon icon={solid("arrow-right")} className='sto' />;
		return (
			<span className={classNames.join(" ")} key={`${lvl}-${i}`}>
				{element}
			</span>
		);
	});
};
export default renderElements;
