import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const CtrlBtns = ({ click, logMode }) => {
	const ctrlBtns = [
		<button className='up' key={0} onClick={logMode ? click.upDownClick : null}>
			<FontAwesomeIcon icon={solid("arrow-up")} />
		</button>,
		<button
			className='down'
			key={1}
			onClick={logMode ? click.upDownClick : null}>
			<FontAwesomeIcon icon={solid("arrow-down")} />
		</button>,
		<button className='left' key={2} onClick={click.leftClick}>
			<FontAwesomeIcon icon={solid("arrow-left")} />
		</button>,
		<button className='right' key={3} onClick={click.rightClick}>
			<FontAwesomeIcon icon={solid("arrow-right")} />
		</button>,
	];

	return <div className='ctrlBtns-frame'>{ctrlBtns}</div>;
};

export default CtrlBtns;
