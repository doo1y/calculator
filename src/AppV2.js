import { useState, useEffect, useMemo, isValidElement, useRef } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { compile, evaluate, im, log, range } from "mathjs";
import {
	leftClickStatMode,
	rightClickStatMode,
	leftClick,
	rightClick,
	leftRightOnWindow,
} from "./Actions/leftRight";
import { dataAdded, dataRemoved } from "./features/reducers/dataSlice";
import { varAdded } from "./features/reducers/varSlice";
import {
	windowConfigured,
	defaultWindowConfigRestored,
} from "./features/reducers/windowSlice";
import { yPlotsAdded } from "./features/reducers/yPlotsSlice";
import {
	upDownOnMath,
	upDownOnStat,
	upDownOnWindowAndYPlot,
} from "./Actions/upDown";
import { nanoid } from "@reduxjs/toolkit";
import { mathView } from "./exports/mathView";
import { delInputData } from "./Actions/delInputData";
import { views } from "./Components/Screen/statScreen/views";
import Screen from "./Components/Screen";
import Buttons from "./Components/Buttons";
import GraphScreen from "./Components/Screen/GraphScreen";
import MathFuncScreen from "./Components/Screen/mathFuncScreen";
import WindowConfigScreen from "./Components/Screen/windowConfigScreen";
import YPlotScreen from "./Components/Screen/yPlotScreen";
import StatScreen from "./Components/Screen/statScreen";
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
		yPlotMode: false,
		statMode: false,
		zoomMode: false,
		graphMode: false,
	});
	const [pointer, setPointer] = useState([0, "1"]);
	const [clearCounter, setClearCounter] = useState(0);
	const vars = useSelector((state) => state.vars.values);
	const windowSettings = useSelector((state) => state.window.config);
	const yPlots = useSelector((state) => state.yPlots.yValues);
	const dispatch = useDispatch();

	const turnOn = (e) => {
		e.preventDefault();
		/** TODO! -
		 * Change defaultWindowConfigRestored to defaultConfigRestored and
		 * make it so that all config will revert to default
		 */
		dispatch(defaultWindowConfigRestored());
		setOn(!on);
	};

	/******************* MODE ALTERING FUNCTIONS *******************/

	const onWindowClick = (e) => {
		e.preventDefault();
		if (!mode.windowMode) {
			setCache(inputData);
			const windowSettingsArray = new Array();
			// TODO! - Optional: Change to Array.prototype.map() ??? Performance??

			windowSettings.forEach(([n, v], i) => {
				const singleCharArray = new Array();
				for (const char of JSON.stringify(v).split("")) {
					singleCharArray.push([char, ""]);
				}
				windowSettingsArray.push([singleCharArray, ""]);
			});
			windowSettingsArray[0][0][0][1] = "pointer";
			windowSettingsArray[0][1] = "focused";
			setInputData(windowSettingsArray);

			setMode(Object.assign(mode, { windowMode: !mode.windowMode }));
		}
	};

	const onYPlotClick = (e) => {
		e.preventDefault;
		if (!mode.yPlotMode) {
			setCache(inputData);
			let newInputData = new Array();
			yPlots.forEach(([[n, v], b], i) => {
				const singleCharArray = new Array();
				if (v) {
					for (const char of v.split("")) {
						singleCharArray.push([char, ""]);
					}
				} else singleCharArray.push([null, ""]);
				newInputData.push([singleCharArray, "", b]);
			});

			newInputData[0][0][0][1] = "pointer";
			newInputData[0][1] = "focused";
			setInputData(newInputData);
			setPointer(null);
			setMode(Object.assign(mode, { yPlotMode: !mode.yPlotMode }));
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

	const onStatClick = (e) => {
		e.preventDefault();
		if (!mode.statMode) {
			setCache(inputData);
			const importedView = views;
			importedView[0][1] = "focused";
			importedView[0][0][0][1] = "pointer";
			setInputData(importedView);
			setMode(Object.assign(mode, { statMode: !mode.statMode }));
		}
	};

	const onGraphClick = (e) => {
		const exprArray = new Array();
		yPlots.forEach(([[n, v], b], i) => {
			try {
				if (b && v) {
					console.log(v);
					// render the plot using plotly
					const expr = compile(v);
					exprArray.push(expr);
				}
			} catch (err) {
				console.error(err);
				alert(err);
			}
		});
		setCache(inputData);
		setInputData(exprArray);
		setMode(Object.assign(mode, { graphMode: true }));
	};

	/***************************************************************/

	/********************* CONTROLLER FUNCTIONS ********************/
	const onLeftClick = (e) => {
		e.preventDefault();
		if (mode.windowMode) {
			const focusedIndex = inputData.findIndex(([x, p], i) => p === "focused");
			const newData = inputData.toSpliced(focusedIndex, 1, [
				leftClick(inputData[focusedIndex][0]),
				"focused",
			]);
			setInputData(newData);
			return;
		}
		if (mode.yPlotMode) {
			let newData;
			const focusedIdx = inputData.findIndex(([x, p, b], i) => p === "focused"),
				pointerIdx = inputData[focusedIdx][0].findIndex(
					([x, p]) => p === "pointer"
				);
			// if pointerIdx is at 0
			if (!pointerIdx) {
				newData = inputData.toSpliced(focusedIdx, 1, [
					inputData[focusedIdx][0].toSpliced(pointerIdx, 1, [
						inputData[focusedIdx][0][pointerIdx][0],
						"",
					]),
					"focused",
					inputData[focusedIdx][2],
				]);
				setPointer(focusedIdx);
			}
			// if pointerIdx is not found, then it is at the bool so it is already at the end
			else if (pointerIdx < 0) {
				return;
			} else {
				newData = inputData.toSpliced(focusedIdx, 1, [
					leftClick(inputData[focusedIdx][0]),
					"focused",
					inputData[focusedIdx][2],
				]);
			}
			setInputData(newData);
			return;
		}
		if (mode.statMode) {
			setInputData(leftClickStatMode(inputData));
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
		if (mode.yPlotMode) {
			let newData;
			const focusedIdx = inputData.findIndex(([x, p, b], i) => p === "focused"),
				pointerIdx = inputData[focusedIdx][0].findIndex(
					([x, p]) => p === "pointer"
				);
			// if pointerIdx is not to be found, the pointer is currently at the bool
			if (pointerIdx < 0) {
				newData = inputData.toSpliced(focusedIdx, 1, [
					inputData[focusedIdx][0].toSpliced(0, 1, [
						inputData[focusedIdx][0][0][0],
						"pointer",
					]),
					"focused",
					inputData[focusedIdx][2],
				]);
				setPointer();
			} else {
				newData = inputData.toSpliced(focusedIdx, 1, [
					rightClick(inputData[focusedIdx][0]),
					"focused",
					inputData[focusedIdx][2],
				]);
			}
			setInputData(newData);
			return;
		}
		if (mode.statMode) {
			setInputData(rightClickStatMode(inputData));
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
		let newData, newPointer;
		if (mode.windowMode || mode.yPlotMode) {
			[newData, newPointer] = upDownOnWindowAndYPlot(e, inputData);
			setInputData(newData);
			if (newPointer >= 0) setPointer(newPointer);
			return;
		}
		if (mode.statMode) {
			setInputData(upDownOnStat(e, inputData));
			return;
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
			console.log(clearCounter);
			setClearCounter(1);
			console.log(clearCounter);
			switch (true) {
				case mode.windowMode:
					const windowIdx = inputData.findIndex(([x, p]) => p === "focused");
					setInputData(
						inputData.toSpliced(windowIdx, 1, [[[null, "pointer"]], "focused"])
					);
					break;
				case mode.yPlotMode:
					const yPlotIdx = inputData.findIndex(([x, p]) => p === "focused");
					setInputData(
						inputData.toSpliced(yPlotIdx, 1, [[[null, "pointer"]], "focused"])
					);
					break;
				case mode.mathMode:
					break;
				case mode.stoMode:
					break;
				default:
					setInputData([[null, "pointer"]]);
			}
		} else {
			setClearCounter(0);
			if (cache) {
				setInputData(cache);
				setCache();
			}
			setMode({
				secMode: false,
				windowMode: false,
				stoMode: false,
				alphaMode: { active: false, lock: false },
				mathMode: false,
				yPlotMode: false,
				zoomMode: false,
				statMode: false,
				graphMode: false,
			});
		}
	};

	const onDelClick = (e) => {
		e.preventDefault();
		let inputDataDeleted;
		if (mode.windowMode || mode.yPlotMode) {
			inputDataDeleted = delInputData(inputData, 1);
		} else {
			inputDataDeleted = delInputData(inputData);
		}
		setInputData(inputDataDeleted);

		// if (mode.logMode) {
		// 	setInputData({
		// 		Base: {
		// 			v: numData.Base.focused
		// 				? delVal(numData.Base.v, pointer)
		// 				: numData.Base.v,
		// 			focused: numData.Base.focused,
		// 		},
		// 		Num: {
		// 			v: numData.Num.focused
		// 				? delVal(numData.Num.v, pointer)
		// 				: numData.Num.v,
		// 			focused: numData.Num.focused,
		// 		},
		// 	});
		// } else if (!mode.logMode) {
		// 	setInputData();
		// }
	};

	const onBasicBtnsClick = (e) => {
		e.preventDefault();
		let val = e.currentTarget.value.split(",");
		val = mode.alphaMode.active ? val[2] : val[1];
		if (mode.windowMode || mode.yPlotMode) {
			const currFocus = inputData.findIndex(([x, p, b], i) => p === "focused");

			const newData = mode.yPlotMode
				? inputData.toSpliced(currFocus, 1, [
						updateDataList(inputData[currFocus][0], val),
						"focused",
						inputData[currFocus][2],
				  ])
				: inputData.toSpliced(currFocus, 1, [
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
		if (clearCounter) setClearCounter(0);
	};

	const onExpClick = (e) => {
		e.preventDefault();
		let val = e.currentTarget.value.split(",");
		val = mode.alphaMode.active ? val[2] : val[1];
		if (mode.yPlotMode) {
			const currFocus = inputData.findIndex(([x, p], i) => p === "focused");
			const newData = inputData.toSpliced(currFocus, 1, [
				insertExp(inputData[currFocus][0], val),
				"focused",
				inputData[currFocus][2],
			]);
			setInputData(newData);
		} else if (mode.windowMode) {
			const currFocus = inputData.findIndex(([x, p], i) => p === "focused");
			const newData = inputData.toSpliced(currFocus, 1, [
				insertExp(inputData[currFocus][0], val),
				"focused",
			]);
			setInputData(newData);
		} else setInputData(insertExp(inputData, val));
	};

	/***************************************************************/

	const onEnterClick = async (e) => {
		e.preventDefault();
		if (mode.mathMode) {
			const value = selectMathFuncItem(pointer);
			if (value) {
				click.onGenClick;
			}
		} else if (mode.yPlotMode) {
			const focusedIdx = inputData.findIndex(([x, p, b], i) => p === "focused"),
				pointerIdx = inputData[focusedIdx][0].findIndex(
					([x, p]) => p === "pointer"
				);
			// if enter was clicked when pointerIdx is -1, then the user wants to change the bool value
			if (pointerIdx < 0) {
				setInputData(
					inputData.toSpliced(focusedIdx, 1, [
						inputData[focusedIdx][0],
						"focused",
						!inputData[focusedIdx][2],
					])
				);
			} else {
				const yPlotValuesArray = new Array();
				inputData.forEach(([x, y, z], i) => {
					const expr = constructEvalExpr(x, vars);
					if (!expr[expr.length - 1]) expr.pop();
					yPlotValuesArray.push([[i === 10 ? 0 : i + 1, expr.join("")], z]);
				});
				dispatch(yPlotsAdded(yPlotValuesArray));
				setInputData(cache);
				setCache();
				setMode({
					secMode: false,
					windowMode: false,
					stoMode: false,
					alphaMode: { active: false, lock: false },
					mathMode: false,
					yPlotMode: false,
					statMode: false,
					zoomMode: false,
					graphMode: false,
				});
			}
			return;
		} else if (mode.windowMode) {
			const inputValues = inputData.map(([x, p]) => x.map(([v, q]) => v));
			inputValues.forEach(
				(x, i) =>
					(inputValues[i] = mode.windowMode ? Number(x.join("")) : x.join(""))
			);
			dispatch(windowConfigured(inputValues));
			setInputData(cache);
			setCache();
			setMode({
				secMode: false,
				windowMode: false,
				stoMode: false,
				alphaMode: { active: false, lock: false },
				mathMode: false,
				yPlotMode: false,
				statMode: false,
				zoomMode: false,
				graphMode: false,
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

	return (
		<div className='App'>
			<div className='frame'>
				{mode.graphMode ? (
					<GraphScreen key='graph' inputData={inputData} />
				) : mode.statMode ? (
					<StatScreen key='stat' inputData={inputData} />
				) : mode.yPlotMode ? (
					<YPlotScreen key='yplot' pointer={pointer} inputData={inputData} />
				) : mode.windowMode ? (
					<WindowConfigScreen
						key='window'
						pointer={pointer}
						windowValues={inputData}
					/>
				) : mode.mathMode ? (
					<MathFuncScreen key='math' pointer={pointer} mathView={mathView} />
				) : (
					<Screen key='main' inputData={inputData} />
				)}
				<Buttons
					onGraphClick={onGraphClick}
					onStatClick={onStatClick}
					onYPlotClick={onYPlotClick}
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
