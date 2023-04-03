const NumberButtons = ({ click, logMode }) => {
	const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."];

	const numBtn = numbers.map((num, idx) => (
		<button
			key={idx}
			className='numbers'
			value={num}
			onClick={logMode ? click.onGenClickLog : click.onGenClick}>
			{num}
		</button>
	));

	numBtn.push(
		<button
			key={numBtn.length}
			className='numbers'
			value='-'
			onClick={click.onGenClick}>
			[-]
		</button>
	);

	return <div className='numbers-frame'>{numBtn}</div>;
};

export default NumberButtons;
