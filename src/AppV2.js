import { useState, useEffect, useMemo, isValidElement, useRef } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { evaluate, log } from "mathjs";
import { leftClick, rightClick, leftRightOnWindow } from "./Actions/leftRight";
import { dataAdded, dataRemoved } from "./features/reducers/dataSlice";
import { varAdded } from "./features/reducers/varSlice";
import {
	windowConfigured,
	defaultWindowConfigRestored,
} from "./features/reducers/windowSlice";
import { upDownOnMath, upDownOnWindow } from "./Actions/upDown";
import { nanoid } from "@reduxjs/toolkit";
import { mathView } from "./exports/mathView";
import Screen from "./Components/Screen";
import Buttons from "./Components/Buttons";
import MathFuncScreen from "./Components/Screen/mathFuncScreen";
import WindowConfigScreen from "./Components/Screen/windowConfigScreen";
import updateDataList from "./Actions/updateDataList";
import insertExp from "./Actions/insertExp";

import checkSto from "./Actions/checkSto";
import constructEvalExpr from "./Actions/constructEvalExpr";
import selectMathFuncItem from "./Actions/selectMathFuncItem";
import "./App.css";

const App = () => {
	const [cache, setCache] = useState();
	const [inputData, setInputData] = useState([[null, "pointer"]]);
	const [on, setOn] = useState(false);
	const [mode, setMode] = useState({
		secMode: false,
		windowMode: false,
		stoMode: false,
		alphaMode: { active: false, lock: false },
		mathMode: false,
	});
	const [pointer, setPointer] = useState([0, "1"]);
	const [clearCounter, setClearCounter] = useState(0);
	const vars = useSelector((state) => state.vars);
	const windowSettings = useSelector((state) => state.window.config);
	const dispatch = useDispatch();

	const turnOn = (e) => {
		e.preventDefault();
		dispatch(defaultWindowConfigRestored());
		setOn(!on);
	};

	/******************* MODE ALTERING FUNCTIONS *******************/

	const onWindowClick = (e) => {
		e.preventDefault();
		if (!mode.windowMode) {
			console.log(windowSettings);
			setCache(inputData);
			const windowSettingsArray = new Array();
			// TODO! - Optional: Change to Array.prototype.map() ??? Performance??

			windowSettings.forEach(([n, v], i) => {
				const singleCharArray = new Array();
				for (const char of JSON.stringify(v).split("")) {
					// [[1, "pointer"], [0, ""], ...] <- singleCharArray
					singleCharArray.push([char, ""]);
				}
				// [[[[1, ""], [0, ""]], "focused"], ...] <- windowSettingsArray
				windowSettingsArray.push([singleCharArray, ""]);
			});
			/**
			 * REFERENCE:
			 * "pointer" index = [][0][][1]
			 * "focused" index = [][1]
			 * windowSettingsArray = [
			 *   [
			 *     [[1, ""]],
			 *     ""
			 *   ], <- xMin
			 *   [
			 *     [[1, ""], [0, ""]],
			 *     ""
			 *   ], <- xMax
			 * .......
			 * ]
			 */
			windowSettingsArray[0][0][0][1] = "pointer";
			windowSettingsArray[0][1] = "focused";
			setInputData(windowSettingsArray);

			setMode(Object.assign(mode, { windowMode: !mode.windowMode }));
			setPointer(0);
		}
	};

	const onMathClick = (e) => {
		e.preventDefault();
		setCache(inputData);
		setMode(Object.assign(mode, { mathMode: true }));
	};

	const onStoClick = (e) => {
		e.preventDefault();
		setInputData(updateDataList(inputData, "sto"));
		setMode(
			Object.assign(mode, {
				stoMode: true,
			})
		);
	};

	const onAlphaClick = (e) => {
		e.preventDefault();
		setMode(
			Object.assign(mode, {
				alphaMode: { active: !mode.alphaMode.active, lock: false },
			})
		);
		console.log(JSON.stringify(mode));
	};

	const onSecClick = (e) => {
		e.preventDefault();
		setMode(
			Object.assign(mode, {
				secMode: !mode.secMode,
			})
		);
	};

	/***************************************************************/

	/********************* CONTROLLER FUNCTIONS ********************/
	const onLeftClick = (e) => {
		e.preventDefault();
		if (mode.windowMode) {
			const focusIndex = inputData.findIndex(([x, p], i) => p === "focused");
			const newData = inputData.toSpliced(focusIndex, 1, [
				leftClick(inputData[focusIndex][0]),
				"focused",
			]);
			setInputData(newData);
			return;
		}
		if (mode.mathMode) {
			if (pointer[0] > 0) return setPointer([pointer[0] - 1, "1"]);
			setPointer([4, "1"]);
			return;
		}
		setInputData(leftClick(inputData));
	};

	const onRightClick = (e) => {
		e.preventDefault();
		if (mode.windowMode) {
			const focusIndex = inputData.findIndex(([x, p], i) => p === "focused");
			const newData = inputData.toSpliced(focusIndex, 1, [
				rightClick(inputData[focusIndex][0]),
				"focused",
			]);
			setInputData(newData);
			return;
		}
		if (mode.mathMode) {
			if (pointer[0] < 4) return setPointer([pointer[0] + 1, "1"]);
			return setPointer([0, "1"]);
		}
		setInputData(rightClick(inputData));
	};

	const upDownClick = (e) => {
		e.preventDefault();
		let newData;
		if (mode.windowMode) {
			newData = upDownOnWindow(e, inputData);
			setInputData(newData);
		}
		if (mode.mathMode) {
			newData = upDownOnMath(e, pointer);
			setPointer(newData);
			return;
		}
	};

	/***************************************************************/

	/********************* USER INPUT FUNCTIONS ********************/

	const onClearClick = (e) => {
		e.preventDefault();
		if (!clearCounter) {
			switch (true) {
				case mode.windowMode:
					const windowIdx = inputData.findIndex(([x, p]) => p === "focused");
					setInputData(
						inputData.toSpliced(windowIdx, [[[null, "pointer"]], "focused"])
					);
					break;
				case mode.mathMode:
					break;
				case mode.stoMode:
					break;
				default:
					setInputData([[null, "pointer"]]);
					break;
			}
			setClearCounter(clearCounter + 1);
		} else {
			setClearCounter(0);
			const modeChecker = Object.values(mode);
			if (
				!modeChecker.every((value) =>
					typeof value === "object" ? !value.active : !value
				)
			)
				setMode({
					secMode: false,
					windowMode: false,
					stoMode: false,
					alphaMode: { active: false, lock: false },
					mathMode: false,
				});
		}
	};
	const onDelClick = (e) => {
		e.preventDefault();
		if (mode.logMode) {
			setInputData({
				Base: {
					v: numData.Base.focused
						? delVal(numData.Base.v, pointer)
						: numData.Base.v,
					focused: numData.Base.focused,
				},
				Num: {
					v: numData.Num.focused
						? delVal(numData.Num.v, pointer)
						: numData.Num.v,
					focused: numData.Num.focused,
				},
			});
		} else if (!mode.logMode) {
			setInputData();
		}
	};

	const onBasicBtnsClick = (e) => {
		e.preventDefault();
		let val = e.currentTarget.value.split(",");
		val = mode.alphaMode.active ? val[2] : val[1];
		if (mode.windowMode) {
			const currFocus = inputData.findIndex(([x, p], i) => p === "focused");
			const newData = inputData.toSpliced(currFocus, 1, [
				updateDataList(inputData[currFocus][0], val),
				"focused",
			]);
			setInputData(newData);
		} else setInputData(updateDataList(inputData, val));
		if (mode.alphaMode.active && !mode.alphaMode.lock) {
			setMode(
				Object.assign(mode, { alphaMode: { active: false, lock: false } })
			);
		}
		if (clearCounter) setClearCounter(clearCounter + 1);
	};

	const onExpClick = (e) => {
		e.preventDefault();
		let val = e.currentTarget.value.split(",");
		val = mode.alphaMode.active ? val[2] : val[1];
		setInputData(insertExp(inputData, val));
	};

	/***************************************************************/

	const onEnterClick = async (e) => {
		e.preventDefault();
		if (mode.mathMode) {
			const value = selectMathFuncItem(pointer);
			if (value) {
				click.onGenClick;
			}
		} else if (mode.windowMode) {
			const windowValues = inputData.map(([x, p]) => x.map(([v, q]) => v));
			windowValues.forEach((x, i) => (windowValues[i] = Number(x.join(""))));
			dispatch(windowConfigured(windowValues));
			setInputData(cache);
			setCache();
			setMode({
				secMode: false,
				windowMode: false,
				stoMode: false,
				alphaMode: { active: false, lock: false },
				mathMode: false,
			});
			return;
		}
		// else if ( mode.logMode ) {
		// 	let val = (
		// 		<span className='logValue'>
		// 			log
		// 			<sub>
		// 				{numData.Base.v.map(([v, p]) => {
		// 					if (!isValidElement(v)) return v;
		// 				})}
		// 			</sub>
		// 			(
		// 			{numData.Num.v.map(([v, p]) => {
		// 				if (!isValidElement(v)) return v;
		// 			})}
		// 			)
		// 		</span>
		// 	);
		// 	setNumData(registerInput(cache.numData, cache.pointer, val));
		// 	setPointer(cache.pointer + 1);
		// 	setCache({});
		// 	setMode(
		// 		Object.assign(mode, {
		// 			logMode: false,
		// 		})
		// 	);
		// } else
		if (mode.stoMode) {
			try {
				const [aMap, bMap] = checkSto(inputData),
					ans = evaluate(aMap.join("")),
					variable = bMap.join("");
				if (ans && variable) {
					dispatch(
						varAdded({
							id: variable,
							content: ans,
						})
					);
					dispatch(
						dataAdded({
							id: nanoid(),
							content: ans,
						})
					);
					setInputData([[null, "pointer"]]);
					setMode(
						Object.assign(mode, {
							stoMode: false,
						})
					);
				}
			} catch (e) {
				console.log(e);
			}
		} else {
			const n = constructEvalExpr(inputData, vars);
			try {
				const ans = evaluate(n.join(""));
				console.log(ans);
				if (ans && n.length) {
					dispatch(
						dataAdded({
							id: nanoid(),
							content: ans,
						})
					);
					setInputData([[null, "pointer"]]);
				}
			} catch (e) {
				console.log(e);
			}
		}
	};

	useEffect(() => {
		setClearCounter(0);
	}, [inputData]);

	return (
		<div className='App'>
			<div className='frame'>
				{mode.windowMode ? (
					<WindowConfigScreen pointer={pointer} windowValues={inputData} />
				) : mode.mathMode ? (
					<MathFuncScreen pointer={pointer} mathView={mathView} />
				) : (
					<Screen inputData={inputData} />
				)}
				<Buttons
					onDelClick={onDelClick}
					onSecClick={onSecClick}
					onWindowClick={onWindowClick}
					upDownClick={upDownClick}
					onMathClick={onMathClick}
					onClearClick={onClearClick}
					onEnterClick={onEnterClick}
					onStoClick={onStoClick}
					onAlphaClick={onAlphaClick}
					onExpClick={onExpClick}
					onLeftClick={onLeftClick}
					onRightClick={onRightClick}
					onBasicBtnsClick={onBasicBtnsClick}
				/>
			</div>
		</div>
	);
};

export default App;
