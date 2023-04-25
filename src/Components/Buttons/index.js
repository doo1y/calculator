import NumberButtons from "./numbers";
import RightFns from "./rightFns";
import LeftFns from "./leftFns";
import MidFns from "./midFns";
import TopFns from "./topFns";
import CtrlBtns from "./ctrlBtns";
import UpperBtns from "./upperBtns";
import "./index.css";

const Buttons = ({
	onSecClick,
	onDelClick,
	onWindowClick,
	upDownClick,
	onMathClick,
	onClearClick,
	onEnterClick,
	onStoClick,
	onAlphaClick,
	onExpClick,
	onBasicBtnsClick,
	onLeftClick,
	onRightClick,
}) => {
	return (
		<div className='buttons-frame'>
			<UpperBtns onWindowClick={onWindowClick} />
			<TopFns onAlphaClick={onAlphaClick} />
			<MidFns
				onMathClick={onMathClick}
				onExpClick={onExpClick}
				onBasicBtnsClick={onBasicBtnsClick}
				onClearClick={onClearClick}
			/>
			<CtrlBtns
				onLeftClick={onLeftClick}
				onRightClick={onRightClick}
				upDownClick={upDownClick}
			/>
			<LeftFns onStoClick={onStoClick} onBasicBtnsClick={onBasicBtnsClick} />
			<NumberButtons onNumberClick={onBasicBtnsClick} />
			<RightFns onEnterClick={onEnterClick} />
		</div>
	);
};

export default Buttons;
