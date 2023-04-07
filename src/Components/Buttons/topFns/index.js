const TopFns = ({ click }) => {
	const fns = [
		[["", "2nd", ""], click.secBtnClick],
		[["quit", "mode"], click.modeBtnClick],
		[["ins", "del"], click.onDelClick],
		[["lock", "alpha", ""], click.alphaClick],
		[["link", <>X,T,&theta;,n</>, ""]],
		[["list", "stat"]],
	];

	const topFns = fns.map((fn, idx) => (
		<button key={idx} onClick={fn[1]} className='topFns'>
			<span className='secChar'>{fn[0][0]}</span>
			<span className='mainChar'>{fn[0][1]}</span>
			<span className='alphaChar'>{fn[0][2]}</span>
		</button>
	));

	return <div className='topFns-frame'>{topFns}</div>;
};

export default TopFns;
