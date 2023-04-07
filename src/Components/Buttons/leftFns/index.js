// TODO: Change onLogClick to go through on Gen Click using a conditional
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
// ln x = 2.303 log x
const LeftFns = ({ click, turnOn }) => {
	const fns = [
		[
			[
				<>
					10<sup>x</sup>
				</>,
				"log",
				"N",
			],
			click.onLogClick,
			",,N",
		],
		[
			[
				<>
					e<sup>x</sup>
				</>,
				"ln",
				"S",
			],
			click.onGenClick,
			",ln(, S",
		],
		[
			[
				"rcl",
				<span style={{ fontSize: "14px", fontWeight: "500" }}>
					sto
					<FontAwesomeIcon icon={solid("arrow-right")} size='xs' />
				</span>,
				"X",
			],
			click.stoClick,
			",,X",
		],
		[["off", "on"], turnOn],
	];

	const leftFns = fns.map((fn, idx) => (
		<button key={idx} value={fn[2]} onClick={fn[1]} className='leftFns'>
			<span className='secChar'>{fn[0][0]}</span>
			<span className='mainChar'>{fn[0][1]}</span>
			<span className='alphaChar'>{fn[0][2]}</span>
		</button>
	));

	return <div className='leftFns-frame'>{leftFns}</div>;
};

export default LeftFns;
