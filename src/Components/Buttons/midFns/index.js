import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const MidFns = ({ click }) => {
	const fns = [
		["MATH"],
		["APPS"],
		["PRGM"],
		["VARS"],
		["CLEAR", click.onClearClick],
		[
			<>
				x<sup>-1</sup>
			</>,
			click.onGenClick,
			"^-1",
		],
		["SIN", click.onGenClick, "sin("],
		["COS", click.onGenClick, "cos("],
		["TAN", click.onGenClick, "tan("],
		[<FontAwesomeIcon icon={solid("chevron-up")} />, click.onGenClick, "^"],
		[
			<>
				x<sup>2</sup>
			</>,
			click.onGenClick,
			"^2",
		],
		[",", click.onGenClick, ","],
		["(", click.onGenClick, "("],
		[")", click.onGenClick, ")"],
		[<FontAwesomeIcon icon={solid("divide")} />, click.onGenClick, "/"],
	];

	const midFns = fns.map((fn, idx) => (
		<button key={idx} value={fn[2]} onClick={fn[1]} className='midFns'>
			{fn[0]}
		</button>
	));

	return <div className='midFns-frame'>{midFns}</div>;
};

export default MidFns;
