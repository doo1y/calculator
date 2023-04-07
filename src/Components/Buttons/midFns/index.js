import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const MidFns = ({ click }) => {
	const fns = [
		[["test", "math", "A"], click.onGenClick, ",,A"],
		[["angle", "apps", "B"], click.onGenClick, ",,B"],
		[["draw", "prgm", "C"], click.onGenClick, ",,C"],
		[["distr", "vars"], click.onGenClick, ","],
		[["", "clear", ""], click.onClearClick],
		[
			[
				"matrix",
				<>
					x<sup>-1</sup>
				</>,
				"D",
			],
			click.onGenClick,
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
			click.onGenClick,
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
			click.onGenClick,
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
			click.onGenClick,
			",tan(,G",
		],
		[
			[<>&pi;</>, <FontAwesomeIcon icon={solid("chevron-up")} />, "H"],
			click.onGenClick,
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
			click.onGenClick,
			",^2,I",
		],
		[["EE", ",", "J"], click.onGenClick, ",,J"],
		[["{", "(", "K"], click.onGenClick, ",(,K"],
		[["}", ")", "L"], click.onGenClick, ",),L"],
		[
			["e", <FontAwesomeIcon icon={solid("divide")} />, "M"],
			click.onGenClick,
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
