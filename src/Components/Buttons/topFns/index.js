const TopFns = ({ click }) => {
	const fns = [
		["2nd"],
		["MODE"],
		["DEL", click.onDelClick],
		["ALPHA"],
		[<>X,T,&theta;,n</>],
		["STAT"],
	];

	const topFns = fns.map((fn, idx) => (
		<button key={idx} onClick={fn[1]} className='topFns'>
			{fn[0]}
		</button>
	));

	return <div className='topFns-frame'>{topFns}</div>;
};

export default TopFns;
