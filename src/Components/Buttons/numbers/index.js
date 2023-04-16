const NumberButtons = ({ click, mode }) => {
	const numbers = [
		["u", "7", "O"],
		["v", "8", "P"],
		["w", "9", "Q"],
		["L4", "4", "T"],
		["L5", "5", "U"],
		["L6", "6", "V"],
		["L1", "1", "Y"],
		["L2", "2", "Z"],
		["L3", "3", <>&#x3B8;</>],
		["catalog", "0", <>&#x2423;</>],
		[<>&#119998;</>, ".", ":"],
	];

	const numBtn = numbers.map((num, idx) => (
		<button
			key={idx}
			className='numbers'
			value={num.join(",")}
			onClick={
				mode.logMode || mode.windowMode
					? click.onGenModeClick
					: click.onGenClick
			}>
			<span className='secChar'>{num[0]}</span>
			<span className='mainChar'>{num[1]}</span>
			<span className='alphaChar'>{num[2]}</span>
		</button>
	));

	numBtn.push(
		<button
			key={numBtn.length}
			className='numbers'
			value={mode.alphaMode ? "?" : mode.secMode ? "ans" : "-"}
			onClick={click.onGenClick}>
			<span className='secChar'>ans</span>
			<span className='mainChar'>[-]</span>
			<span className='alphaChar'>?</span>
		</button>
	);

	return <div className='numbers-frame'>{numBtn}</div>;
};

export default NumberButtons;
