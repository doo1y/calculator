import { useInsertionEffect } from "react";
import WelcomeScreen from "./WelcomeScreen";
import "./index.css";

const Screen = ({ data, inputs, logMode, appOn }) => {
	const mappedData = data.map((d) => (
		<span key={d.id} className='data'>
			{d.content}
		</span>
	));
	const welcomeDisplay = (
		<div className='welcome-screen'>
			<h1 id='welcome-title'>Fuck Off</h1>
			<h2 id='welcome-version'>#V1.0.0</h2>
		</div>
	);

	if (!appOn) return <div className='screen'>{welcomeDisplay}</div>;
	else if (logMode) return <div className='screen'>{inputs}</div>;
	else
		return (
			<div className='screen'>
				{mappedData}
				{inputs}
			</div>
		);
};

export default Screen;
