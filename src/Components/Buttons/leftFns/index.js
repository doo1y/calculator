import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
// ln x = 2.303 log x
const LeftFns = ({ click }) => {
	const fns = [
		["LOG", click.onLogClick],
		["LN", click.onGenClick, "ln("],
		[
			<span>
				STO&nbsp;
				<FontAwesomeIcon icon={solid("arrow-right")} />
			</span>,
		],
		["ON"],
	];

	const leftFns = fns.map((fn, idx) => (
		<button key={idx} value={fn[2]} onClick={fn[1]} className='leftFns'>
			{fn[0]}
		</button>
	));

	return <div className='leftFns-frame'>{leftFns}</div>;
};

export default LeftFns;
