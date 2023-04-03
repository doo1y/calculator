import NumberButtons from "./numbers";
import RightFns from "./rightFns";
import LeftFns from "./leftFns";
import MidFns from "./midFns";
import TopFns from "./topFns";
import CtrlBtns from "./ctrlBtns";
import "./index.css";

const Buttons = ({ buttonClickFns, logMode }) => {
	return (
		<div className='buttons-frame'>
			<TopFns click={buttonClickFns} />
			<MidFns click={buttonClickFns} />
			<CtrlBtns click={buttonClickFns} logMode={logMode} />
			<LeftFns click={buttonClickFns} />
			<NumberButtons click={buttonClickFns} logMode={logMode} />
			<RightFns click={buttonClickFns} />
		</div>
	);
};

export default Buttons;
