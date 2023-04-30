import React from "react";

const StatScreen = ({ inputData }) => {
	const titles = ["EDIT", "CALC", "TEST"];
	return (
		<div className='screen stat-screen'>
			<div className='statscreen-title__container'>
				{titles.map((title, i) => (
					<h2 key={i} className={"statScreen-title" + " " + inputData[i][1]}>
						{title}
					</h2>
				))}
			</div>
			<div className='scroller'>
				{inputData.map(
					([list, focused], i) =>
						focused && (
							<ul key={i} className='statScreen-itemList'>
								{list.map(([[key, value], pointer], ii) => (
									<li key={`${i}-${ii}`} className={"statScreen-item"}>
										<span className={"list-key" + " " + pointer}>{key}:</span>
										&nbsp;&nbsp;
										{value}
									</li>
								))}
							</ul>
						)
				)}
			</div>
		</div>
	);
};

export default StatScreen;
