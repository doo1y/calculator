import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const CtrlBtns = ({ onLeftClick, onRightClick, upDownClick }) => {
	const ctrlBtns = [
		<button className='up' onClick={upDownClick} value='up' key={0}>
			<FontAwesomeIcon icon={solid("arrow-up")} />
		</button>,
		<button className='down' onClick={upDownClick} value='down' key={1}>
			<FontAwesomeIcon icon={solid("arrow-down")} />
		</button>,
		<button className='left' onClick={onLeftClick} key={2}>
			<FontAwesomeIcon icon={solid("arrow-left")} />
		</button>,
		<button className='right' onClick={onRightClick} key={3}>
			<FontAwesomeIcon icon={solid("arrow-right")} />
		</button>,
	];

	return <div className='ctrlBtns-frame'>{ctrlBtns}</div>;
};

export default CtrlBtns;
