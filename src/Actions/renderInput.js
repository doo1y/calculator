// function which outputs input to screen whenever valid button is clicked
function renderInput(numData, logMode) {
	if (logMode) {
		return {
			base: numData.Base.v.map(([c, p], i) => (
				<span key={i} className={p}>
					{c}
				</span>
			)),
			n: numData.Num.v.map(([c, p], i) => (
				<span key={i} className={p}>
					{c}
				</span>
			)),
		};
	}

	return numData.map(([c, p], i) => (
		<span key={i} className={p}>
			{c}
		</span>
	));
}

export default renderInput;
