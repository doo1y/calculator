import { useState, useEffect } from "react";
import renderElements from "../../../Actions/renderElements";
const YPlotScreen = ({ inputData, pointer }) => {
	const [inputs, setInputs] = useState([]);

	useEffect(() => {
		let newData = [];
		inputData.forEach(([x, f, b], i) => {
			newData.push(renderElements(x));
		});
		setInputs(newData);
	}, [inputData]);

	return (
		<div className='screen yplots'>
			<ul className='yPlotList'>
				{inputData.map(([x, f, b], i) => {
					return (
						<li key={i} className={"yplot-config" + " " + f}>
							Y<sub>{i}</sub>&nbsp;
							<span
								className={`yPlot-listItem__selector ${b ? "active" : ""} ${
									pointer == i ? "pointer" : ""
								}`}>
								&nbsp;=&nbsp;
							</span>
							&nbsp;
							{inputs[i]}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default YPlotScreen;
