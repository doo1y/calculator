import NumberButtons from "./numbers";
import RightFns from "./rightFns";
import LeftFns from "./leftFns";
import MidFns from "./midFns";
import TopFns from "./topFns";
import CtrlBtns from "./ctrlBtns";
import UpperBtns from "./upperBtns";
import "./index.css";

const Buttons = ({ buttonClickFns, mode, turnOn }) => {
	return (
		<div className='buttons-frame'>
			<UpperBtns click={buttonClickFns} />
			<TopFns click={buttonClickFns} />
			<MidFns click={buttonClickFns} />
			<CtrlBtns click={buttonClickFns} />
			<LeftFns click={buttonClickFns} turnOn={turnOn} />
			<NumberButtons click={buttonClickFns} mode={mode} />
			<RightFns click={buttonClickFns} />
		</div>
	);
};

export default Buttons;
