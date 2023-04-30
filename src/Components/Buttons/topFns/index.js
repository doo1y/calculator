const TopFns = ({
	onAlphaClick,
	onDelClick,
	onStatClick,
	onBasicBtnsClick,
}) => {
	const fns = [
		[["", "2nd", ""]],
		[["quit", "mode"]],
		[["ins", "del"], onDelClick],
		[["lock", "alpha", ""], onAlphaClick],
		[["link", <>X,T,&theta;,n</>, ""], onBasicBtnsClick, ",x,"],
		[["list", "stat"], onStatClick],
	];

	const topFns = fns.map((fn, idx) => (
		<button key={idx} onClick={fn[1]} value={fn[2]} className='topFns'>
			<span className='secChar'>{fn[0][0]}</span>
			<span className='mainChar'>{fn[0][1]}</span>
			<span className='alphaChar'>{fn[0][2]}</span>
		</button>
	));

	return <div className='topFns-frame'>{topFns}</div>;
};

export default TopFns;
