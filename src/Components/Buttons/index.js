import NumberButtons from "./numbers";
import RightFns from "./rightFns";
import LeftFns from "./leftFns";
import MidFns from "./midFns";
import TopFns from "./topFns";
import CtrlBtns from "./ctrlBtns";
import "./index.css";

const Buttons = ({ buttonClickFns, logMode, turnOn, alphaMode, secMode }) => {
	return (
		<div className='buttons-frame'>
			<TopFns click={buttonClickFns} />
			<MidFns click={buttonClickFns} />
			<CtrlBtns click={buttonClickFns} logMode={logMode} />
			<LeftFns click={buttonClickFns} turnOn={turnOn} />
			<NumberButtons
				click={buttonClickFns}
				logMode={logMode}
				secMode={secMode}
				alphaMode={alphaMode}
			/>
			<RightFns click={buttonClickFns} />
		</div>
	);
};

export default Buttons;
