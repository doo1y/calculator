// function which outputs input to screen whenever valid button is clicked
function renderInput(numData, mode) {
	if (mode.mathMode.active) {
		return;
	} else if (mode.logMode) {
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
	} else if (mode.windowMode) {
		return {
			xmin: numData.xMin.v.map(([c, p], i) => (
				<span key={i} className={p}>
					{c}
				</span>
			)),
			xmax: numData.xMax.v.map(([c, p], i) => (
				<span key={i} className={p}>
					{c}
				</span>
			)),
			xscl: numData.xScl.v.map(([c, p], i) => (
				<span key={i} className={p}>
					{c}
				</span>
			)),
			ymin: numData.yMin.v.map(([c, p], i) => (
				<span key={i} className={p}>
					{c}
				</span>
			)),
			ymax: numData.yMax.v.map(([c, p], i) => (
				<span key={i} className={p}>
					{c}
				</span>
			)),
			yscl: numData.yScl.v.map(([c, p], i) => (
				<span key={i} className={p}>
					{c}
				</span>
			)),
			xres: numData.xRes.v.map(([c, p], i) => (
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
