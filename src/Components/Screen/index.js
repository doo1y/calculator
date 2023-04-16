import { useState, useEffect } from "react";
import "./index.css";

const Screen = ({ data, userInput, mode, appOn, numData, pointer }) => {
	const mathOptions = mode.mathMode.active
		? Array.prototype.map.call(numData, (x, i) => {
				return (
					<td className='mathScreen-body' key={`${x.n}`}>
						{Array.prototype.map.call(x.v, (o, i) => {
							const key = Object.keys(o)[0],
								value = o[key];
							return (
								<span
									height='23.117px'
									className={
										String(pointer[1]) === key ? "mathMode_selected" : ""
									}
									key={`${i}-${key}`}
									value={`${x.n}-${key}`}>
									{key}: {value}
								</span>
							);
						})}
					</td>
				);
		  })
		: null;

	const mappedData = data.map((d, i) => (
		<span key={i} className='data'>
			{d.content}
		</span>
	));

	const welcomeDisplay = (
		<div className='welcome-screen'>
			<h1 id='welcome-title'>Fuck Off</h1>
			<h2 id='welcome-version'>#V1.0.0</h2>
		</div>
	);

	const inputs = mode.mathMode.active ? (
		<div className='mathScreen'>
			<table>
				<thead className='mathScreen-head'>
					<tr>
						{Array.prototype.map.call(numData, (x, i) => (
							<th
								key={i}
								className={`tableHeaders ${
									pointer[0] === i ? "mathMode_selected" : ""
								}`}>
								{x.n}
							</th>
						))}
					</tr>
				</thead>
				<tbody className='mathScreen-body'>
					<tr>{mathOptions[pointer[0]]}</tr>
				</tbody>
			</table>
		</div>
	) : mode.logMode ? (
		<div className='logScreen'>
			<p className={"log" + (numData.Base.focused ? " selected" : "")}>
				Base: <span className='log-base'>{userInput.base}</span>
			</p>
			<p className={"log" + (numData.Num.focused ? " selected" : "")}>
				Num: <span className='log-n'>{userInput.n}</span>
			</p>
			<p className='info'>Press [Enter] to Set Log Values</p>
		</div>
	) : mode.windowMode ? (
		<div className='windowOptions'>
			<h2 className='window-title'>Window</h2>
			<p
				className={"window-config" + (numData.xMin.focused ? " selected" : "")}>
				Xmin=<span className='x-min-value'>{userInput.xmin}</span>
			</p>
			<p
				className={"window-config" + (numData.xMax.focused ? " selected" : "")}>
				Xmax=<span className='x-max-value'>{userInput.xmax}</span>
			</p>
			<p
				className={"window-config" + (numData.xScl.focused ? " selected" : "")}>
				Xscl=<span className='log-base'>{userInput.xscl}</span>
			</p>
			<p
				className={"window-config" + (numData.yMin.focused ? " selected" : "")}>
				Ymin=<span className='log-base'>{userInput.ymin}</span>
			</p>
			<p
				className={"window-config" + (numData.yMax.focused ? " selected" : "")}>
				Ymax=<span className='log-base'>{userInput.ymax}</span>
			</p>
			<p
				className={"window-config" + (numData.yScl.focused ? " selected" : "")}>
				Yscl=<span className='log-base'>{userInput.yscl}</span>
			</p>
			<p
				className={"window-config" + (numData.xRes.focused ? " selected" : "")}>
				Xres=<span className='log-base'>{userInput.xres}</span>
			</p>
			<p className='info'>Press [Enter] to Set Log Values</p>
		</div>
	) : (
		<span className='user-input'>
			<p className='input'>{userInput}</p>
		</span>
	);

	if (!appOn) return <div className='screen'>{welcomeDisplay}</div>;
	if (mode.logMode || mode.windowMode || mode.mathMode.active)
		return <div className='screen'>{inputs}</div>;
	else
		return (
			<div className='screen'>
				{mappedData}
				{inputs}
			</div>
		);
};

export default Screen;
