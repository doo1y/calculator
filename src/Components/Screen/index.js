import { useInsertionEffect } from "react";
import "./index.css";

const Screen = ({ data, inputs, logMode }) => {
	const mappedData = data.map((d) => (
		<span key={d.id} className='data'>
			{d.content}
		</span>
	));

	return logMode ? (
		<div className='screen'>{inputs}</div>
	) : (
		<div className='screen'>
			{mappedData}
			{inputs}
		</div>
	);
};

export default Screen;
