const UpperBtns = ({ click }) => {
	const fns = [
		["y="],
		["window", click.windowBtnClick],
		["zoom"],
		["trace"],
		["graph"],
	];

	const upperFns = fns.map((fn, idx) => (
		<button key={idx} onClick={fn[1]} className='upperFns'>
			{/* <span className='secChar'>{fn[0][0]}</span> */}
			<span className='mainChar'>{fn[0]}</span>
			{/* <span className='alphaChar'>{fn[0][2]}</span> */}
		</button>
	));

	return <div className='upperFns-frame'>{upperFns}</div>;
};

export default UpperBtns;
