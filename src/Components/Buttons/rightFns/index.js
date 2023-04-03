import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const RightFns = ({ click }) => {
	const fns = [
		[<FontAwesomeIcon icon={solid("xmark")} />, " * "],
		[<FontAwesomeIcon icon={solid("plus")} />, " + "],
		[<FontAwesomeIcon icon={solid("minus")} />, " - "],
		["Enter"],
	];

	const rightFns = fns.map((fn, idx) => {
		return fn[0] === "Enter" ? (
			<button key={idx} onClick={click.onEnterClick} className='rightFns enter'>
				{fn}
			</button>
		) : (
			<button
				key={idx}
				value={fn[1]}
				onClick={click.onGenClick}
				className='rightFns'>
				{fn[0]}
			</button>
		);
	});

	return <div className='rightFns-frame'>{rightFns}</div>;
};

export default RightFns;
