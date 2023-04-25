import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const MidFns = ({
	onMathClick,
	onExpClick,
	onBasicBtnsClick,
	onClearClick,
}) => {
	const fns = [
		[["test", "math", "A"], onMathClick, ",,A"],
		[["angle", "apps", "B"], , ",,B"],
		[["draw", "prgm", "C"], , ",,C"],
		[["distr", "vars"], , ","],
		[["", "clear", ""], onClearClick],
		[
			[
				"matrix",
				<>
					x<sup>-1</sup>
				</>,
				"D",
			],
			onExpClick,
			",^-1,D",
		],
		[
			[
				<>
					sin<sup>-1</sup>
				</>,
				"sin",
				"E",
			],
			onBasicBtnsClick,
			",sin(,E",
		],
		[
			[
				<>
					cos<sup>-1</sup>
				</>,
				"cos",
				"F",
			],
			onBasicBtnsClick,
			",cos(,F",
		],
		[
			[
				<>
					tan<sup>-1</sup>,
				</>,
				"tan",
				"G",
			],
			,
			",tan(,G",
		],
		[
			[<>&pi;</>, <FontAwesomeIcon icon={solid("chevron-up")} />, "H"],
			onExpClick,

			",^,H",
		],
		[
			[
				<>&#x221A;</>,
				<>
					x<sup>2</sup>
				</>,
				"I",
			],
			onExpClick,
			",^2,I",
		],
		[["EE", ",", "J"], onBasicBtnsClick, ",,J"],
		[["{", "(", "K"], onBasicBtnsClick, ",(,K"],
		[["}", ")", "L"], onBasicBtnsClick, ",),L"],
		[
			["e", <FontAwesomeIcon icon={solid("divide")} />, "M"],
			onBasicBtnsClick,
			",/,M",
		],
	];

	const midFns = fns.map((fn, idx) => (
		<button key={idx} value={fn[2]} onClick={fn[1]} className='midFns'>
			<span className='secChar'>{fn[0][0]}</span>
			<span className='mainChar'>{fn[0][1]}</span>
			<span className='alphaChar'>{fn[0][2]}</span>
		</button>
	));

	return <div className='midFns-frame'>{midFns}</div>;
};

export default MidFns;
