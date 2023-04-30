import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const RightFns = ({ onEnterClick, onBasicBtnsClick }) => {
	const fns = [
		[["[", <FontAwesomeIcon icon={solid("xmark")} />, "R"], ",*,R"],
		[["]", <FontAwesomeIcon icon={solid("plus")} />, "W"], ",+,W"],
		[["mem", <FontAwesomeIcon icon={solid("minus")} />, '"'], ',-,"'],
		[["entry", "enter"]],
	];

	const rightFns = fns.map((fn, idx) => {
		return fn[0][1] === "enter" ? (
			<button key={idx} onClick={onEnterClick} className='rightFns enter'>
				<span className='secChar'>{fn[0][0]}</span>
				<span className='mainChar'>{fn[0][1]}</span>
			</button>
		) : (
			<button
				key={idx}
				onClick={onBasicBtnsClick}
				value={fn[1]}
				className='rightFns'>
				<span className='secChar'>{fn[0][0]}</span>
				<span className='mainChar'>{fn[0][1]}</span>
				<span className='alphaChar'>{fn[0][2]}</span>
			</button>
		);
	});

	return <div className='rightFns-frame'>{rightFns}</div>;
};

export default RightFns;
