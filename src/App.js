// TODO: Refactor the registerInput function so that value is modified BEFORE it is passed down as it's argument
// TODO: Refactor ALL functions so that ALL values used as arguments are changed before, not within
// TODO: Refactor what happens when ENTER is clicked

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState, useMemo, isValidElement, useEffect, useRef } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { evaluate, log } from "mathjs";
import { dataAdded } from "./features/data/dataSlice";
import { varAdded } from "./features/var/varSlice";
import { windowConfigured } from "./features/window/windowSlice";
import { useGetWindowConfigurationQuery } from "./features/api/apiSlice";
import Screen from "./Components/Screen";
import Buttons from "./Components/Buttons";
import changeFocus from "./Actions/changeFocus";
import delVal from "./Actions/delVal";
import leftRight from "./Actions/leftRight";
import registerInput from "./Actions/registerInput";
import renderInput from "./Actions/renderInput";

import "./App.css";
import { faBriefcaseClock } from "@fortawesome/free-solid-svg-icons";

const App = () => {
	const [cache, setCache] = useState({});
	const [numData, setNumData] = useState([
		[<span>&nbsp;&nbsp;</span>, "pointer"],
	]);
	const [mode, setMode] = useState({
		windowMode: false,
		logMode: false,
		secMode: false,
		stoMode: false,
		alphaMode: { a: false, lock: false },
		mathMode: { active: false },
	});

	const [pointer, setPointer] = useState(0);
	const [on, setOn] = useState(false);
	const data = useSelector((state) => state.data);
	const vars = useSelector((state) => state.vars);
	const windowConfiguration = useSelector((state) => state.windowConfig);
	const dispatch = useDispatch();

	const userInput = useMemo(
		() => renderInput(numData, mode),
		[numData, pointer]
	);

	const turnOn = (e) => {
		e.preventDefault();
		setOn(!on);
	};

	const buttonClickFns = {
		mathBtnClick: (e) => {
			e.preventDefault();
			if (!mode.mathMode.active) {
				setCache({ numData, pointer });
				const mathView = [
					{
						n: "MATH",
						v: [
							{
								1: (
									<>
										<FontAwesomeIcon icon={solid("caret-right")} />
										&nbsp;Frac
									</>
								),
							},
							{
								2: (
									<>
										<FontAwesomeIcon icon={solid("caret-right")} />
										&nbsp;Dec
									</>
								),
							},
							{ 3: <sup>3</sup> },
							{
								4: (
									<math className='sq-root__sym'>
										<mroot>
											<mi></mi>
											<mn>3</mn>
										</mroot>
									</math>
								),
								value: "^3",
							},
							{
								5: (
									<math className='sq-root__sym'>
										<mroot>
											<mi></mi>
											<mn>x</mn>
										</mroot>
									</math>
								),
							},
							{ 6: "fMin(" },
							{ 7: "fMax(" },
							{ 8: "nDeriv(" },
							{ 9: "fnInt" },
							{ 0: <>summation &sum;&#x28;</> },
							{ A: "logBASE(" },
							{ B: "piecewise(" },
							{ C: "Numeric Solver..." },
						],
					},
					{
						n: "NUM",
						v: [
							{ 1: "abs(" },
							{ 2: "round(" },
							{ 3: "iPart(" },
							{ 4: "fPart(" },
							{ 5: "int(" },
							{ 6: "min(" },
							{ 7: "max(" },
							{ 8: "lcm(" },
							{ 9: "gcd(" },
							{ 0: "remainder(" },
							{
								A: (
									<>
										<FontAwesomeIcon icon={solid("caret-right")} />
										&nbsp;n/d&nbsp;
										<FontAwesomeIcon icon={solid("caret-left")} />
										<FontAwesomeIcon icon={solid("caret-right")} />
										&nbsp;Un/d
									</>
								),
							},
							{
								B: (
									<>
										<FontAwesomeIcon icon={solid("caret-right")} />
										&nbsp;F&nbsp;
										<FontAwesomeIcon icon={solid("caret-left")} />
										<FontAwesomeIcon icon={solid("caret-right")} />
										&nbsp;D
									</>
								),
							},
							{ C: "Un/d" },
							{ D: "n/d" },
						],
					},
					{
						n: "CMPLX",
						v: [
							{ 1: "conj(" },
							{ 2: "real(" },
							{ 3: "imag(" },
							{ 4: "angle(" },
							{ 5: "abs(" },
							{
								6: (
									<>
										<FontAwesomeIcon icon={solid("caret-right")} />
										&nbsp;Rect
									</>
								),
							},
							{
								7: (
									<>
										<FontAwesomeIcon icon={solid("caret-right")} />
										&nbsp;Polar
									</>
								),
							},
						],
					},
					{
						n: "PROB",
						v: [
							{ 1: "rand" },
							{ 2: "nPr" },
							{ 3: "nCr" },
							{ 4: "!" },
							{ 5: "randInt(" },
							{ 6: "randNorm(" },
							{ 7: "randBin(" },
						],
					},
					{
						n: "FRAC",
						v: [
							{ 1: "n/d" },
							{ 2: "Un/d" },
							{
								3: (
									<>
										<FontAwesomeIcon icon={solid("caret-right")} />
										&nbsp;F&nbsp;
										<FontAwesomeIcon icon={solid("caret-left")} />
										<FontAwesomeIcon icon={solid("caret-right")} />
										&nbsp;D
									</>
								),
							},
							{
								4: (
									<>
										<FontAwesomeIcon icon={solid("caret-right")} />
										&nbsp;n/d&nbsp;
										<FontAwesomeIcon icon={solid("caret-left")} />
										<FontAwesomeIcon icon={solid("caret-right")} />
										&nbsp;Un/d
									</>
								),
							},
						],
					},
				];
				setPointer([0, Object.keys(mathView[0].v[0])[0]]);
				setNumData(mathView);
				setMode(
					Object.assign(mode, {
						mathMode: {
							active: true,
						},
					})
				);
			}
		},
		secBtnClick: (e) => {
			e.preventDefault();
			setMode(
				Object.assign(mode, {
					secMode: !mode.secMode,
				})
			);
		},
		modeBtnClick: (e) => {
			e.preventDefault();
			if (mode.secMode) {
				if (mode.logMode) {
					setNumData(cache.numData);
					setPointer(cache.pointer);
					setCache({});
					setMode(
						Object.assign(mode, {
							logMode: !mode.logMode,
						})
					);
				}
			}
		},
		alphaClick: (e) => {
			e.preventDefault();
			mode.secMode && mode.alphaMode.a
				? setMode(Object.assign(mode, { alphaMode: { a: false, lock: false } }))
				: mode.secMode
				? setMode(
						Object.assign(mode, {
							alphaMode: { a: true, lock: true },
						})
				  )
				: setMode(
						Object.assign(mode, {
							alphaMode: { a: !mode.alphaMode.a, lock: false },
						})
				  );
			if (mode.secMode)
				setMode(
					Object.assign(mode, {
						secMode: !mode.secMode,
					})
				);
		},
		stoClick: (e) => {
			e.preventDefault();
			setNumData(
				registerInput(
					numData,
					pointer,
					<FontAwesomeIcon icon={solid("arrow-right")} className='sto' />
				)
			);
			setMode(
				Object.assign(mode, {
					stoMode: true,
				})
			);
			setPointer(pointer + 1);
		},
		leftClick: (e) => {
			e.preventDefault();
			if (mode.mathMode.active) {
				if (pointer[0] > 0) return setPointer([pointer[0] - 1, pointer[1]]);
				return setPointer([4, pointer[1]]);
			} else if (pointer > 0) {
				setNumData(leftRight("left", numData, pointer));
				setPointer(pointer - 1);
			}
		},
		rightClick: (e) => {
			e.preventDefault();
			if (mode.mathMode.active) {
				if (pointer[0] < 4) return setPointer([pointer[0] + 1, pointer[1]]);
				return setPointer([0, pointer[1]]);
			} else if (pointer < numData.length - 1) {
				setNumData(leftRight("right", numData, pointer));
				setPointer(pointer + 1);
			}
		},
		upDownClick: (e) => {
			e.preventDefault();
			let newData;
			if (mode.mathMode.active) {
				const len = numData[pointer[0]].v.length;
				const idx = Array.prototype.findIndex.call(
					numData[pointer[0]].v,
					(x, i) => Object.keys(x)[0] === pointer[1]
				);
				switch (e.currentTarget.value) {
					case "down":
						if (idx < len - 1)
							newData = [pointer[0], Object.keys(numData[0].v[idx + 1])[0]];
						else newData = [pointer[0], Object.keys(numData[0].v[0])[0]];
						break;
					case "up":
						if (idx > 0)
							newData = [pointer[0], Object.keys(numData[0].v[idx - 1])[0]];
						else newData = [pointer[0], Object.keys(numData[0].v[len - 1])[0]];
						break;
				}
				setPointer(newData);
				return;
			}
			if (mode.windowMode) {
				newData =
					e.currentTarget.value === "down"
						? {
								xMin: {
									v: undefined,
									focused: numData.xRes.focused ? true : false,
								},
								xMax: {
									v: undefined,
									focused: numData.xMin.focused ? true : false,
								},
								xScl: {
									v: undefined,
									focused: numData.xMax.focused ? true : false,
								},
								yMin: {
									v: undefined,
									focused: numData.xScl.focused ? true : false,
								},
								yMax: {
									v: undefined,
									focused: numData.yMin.focused ? true : false,
								},
								yScl: {
									v: undefined,
									focused: numData.yMax.focused ? true : false,
								},
								xRes: {
									v: undefined,
									focused: numData.yScl.focused ? true : false,
								},
						  }
						: {
								xMin: {
									v: undefined,
									focused: numData.xMax.focused ? true : false,
								},
								xMax: {
									v: undefined,
									focused: numData.xScl.focused ? true : false,
								},
								xScl: {
									v: undefined,
									focused: numData.yMin.focused ? true : false,
								},
								yMin: {
									v: undefined,
									focused: numData.yMax.focused ? true : false,
								},
								yMax: {
									v: undefined,
									focused: numData.yScl.focused ? true : false,
								},
								yScl: {
									v: undefined,
									focused: numData.xRes.focused ? true : false,
								},
								xRes: {
									v: undefined,
									focused: numData.xMin.focused ? true : false,
								},
						  };
				for (const key of Object.keys(newData)) {
					newData[key].v = changeFocus(numData[key].v, newData[key].focused);
					if (newData[key].focused) {
						setPointer(newData[key].v.length - 1);
					}
				}
				setNumData(newData);
			} else if (mode.logMode) {
				newData = {
					Base: {
						v: undefined,
						focused: !numData.Base.focused,
					},
					Num: {
						v: undefined,
						focused: !numData.Num.focused,
					},
				};
				if (newData.Base.focused) {
					newData.Base.v = changeFocus(numData.Base.v, newData.Base.focused);
					newData.Num.v = changeFocus(numData.Num.v, newData.Num.focused);
					setPointer(newData.Base.v.length - 1);
				} else {
					newData.Base.v = changeFocus(numData.Base.v, newData.Base.focused);
					newData.Num.v = changeFocus(numData.Num.v, newData.Num.focused);
					setPointer(newData.Num.v.length - 1);
				}
				setNumData(newData);
			}
			// else {
			// 	if (!Object.keys(cache).length) {
			// 		setCache({ numData: numData, pointer: pointer });
			// 		setPointer(data.length - 1);
			// 		setNumData();
			// 		// Array.from(data[pointer].content.toString()).map(x => <span>x</span>)
			// 	}
			// }
		},
		onGenClick: (e) => {
			e.preventDefault();
			const values = e.currentTarget.value.split(",");
			let val;
			if (!mode.alphaMode.a) val = values[1];
			else val = values[2];
			setNumData(registerInput(numData, pointer, val));
			setPointer(pointer + 1);
			if (mode.secMode)
				setMode(
					Object.assign(mode, {
						secMode: !mode.secMode,
					})
				);
			if (mode.alphaMode.a && !mode.alphaMode.lock)
				setMode(
					Object.assign(mode, {
						alphaMode: { a: !mode.alphaMode.a, lock: false },
					})
				);
		},
		onGenModeClick: (e) => {
			e.preventDefault();
			const values = e.currentTarget.value.split(",");
			let newData = new Object();
			for (const [key, { v, focused }] of Object.entries(numData)) {
				newData[key] = {
					v: numData[key].focused
						? registerInput(numData[key].v, pointer, values[1])
						: numData[key].v,
					focused: numData[key].focused,
				};
			}
			setNumData(newData);
			setPointer(pointer + 1);
		},
		windowBtnClick: (e) => {
			e.preventDefault();
			if (!mode.windowMode) {
				setCache({ numData: numData, pointer: pointer });
				setNumData({
					xMin: {
						v: [[<span>&nbsp;&nbsp;</span>, "pointer"]],
						focused: true,
					},
					xMax: {
						v: [[<span>&nbsp;&nbsp;</span>, ""]],
						focused: false,
					},
					xScl: {
						v: [[<span>&nbsp;&nbsp;</span>, ""]],
						focused: false,
					},
					yMin: {
						v: [[<span>&nbsp;&nbsp;</span>, ""]],
						focused: false,
					},
					yMax: {
						v: [[<span>&nbsp;&nbsp;</span>, ""]],
						focused: false,
					},
					yScl: {
						v: [[<span>&nbsp;&nbsp;</span>, ""]],
						focused: false,
					},
					xRes: {
						v: [[<span>{windowConfiguration.xRes}</span>, ""]],
						focused: false,
					},
				});
				setPointer(0);
				setMode(
					Object.assign(mode, {
						windowMode: true,
					})
				);
				console.log(mode);
			}
		},
		onLogClick: (e) => {
			e.preventDefault();
			if (!mode.logMode) {
				setCache({ numData: numData, pointer: pointer });
				setNumData({
					Base: { v: [[<span>&nbsp;&nbsp;</span>, "pointer"]], focused: true },
					Num: { v: [[<span>&nbsp;&nbsp;</span>, ""]], focused: false },
				});
				setPointer(0);
				setMode(
					Object.assign(mode, {
						logMode: true,
					})
				);
			}
		},
		onClearClick: (e) => {
			e.preventDefault();
			if (mode.logMode) {
				setNumData(cache.numData);
				setPointer(cache.pointer);
				setCache({});
				setMode(
					Object.assign(mode, {
						logMode: false,
					})
				);
			} else {
				setNumData([[<span>&nbsp;&nbsp;</span>, "pointer"]]);
				setPointer(0);
			}
		},
		onDelClick: (e) => {
			e.preventDefault();
			if (mode.logMode) {
				setNumData({
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
				setPointer(pointer - 1);
			} else if (!mode.logMode) {
				setNumData(delVal(numData, pointer));
				setPointer(pointer - 1);
			}
		},
		onEnterClick: async (e) => {
			e.preventDefault();
			if (mode.mathMode.active) {
				const idx = Array.prototype.findIndex.call(
					numData[pointer[0]].v,
					(x, i) => Object.keys(x)[0] === pointer[1]
				);
				const value = numData[pointer[0]].v[idx].value;
				if (value) {
					click.onGenClick;
				}
			} else if (mode.windowMode) {
				const userWindowConfiguration = {};
				for (const [key, { v }] of Object.entries(numData)) {
					userWindowConfiguration[key] = Number(
						v
							.map((val, i) => {
								if (i === v.length - 1) return;
								else if (isValidElement(val)) return;
								else {
									return val[0];
								}
							})
							.join("")
					);
				}
				dispatch(
					windowConfigured({
						id: "userWindowConfig",
						setting: userWindowConfiguration,
					})
				);
				setNumData(cache.numData);
				setPointer(cache.pointer);
				setCache({});
				setMode(
					Object.assign(mode, {
						windowMode: false,
					})
				);
			} else if (mode.logMode) {
				let val = (
					<span className='logValue'>
						log
						<sub>
							{numData.Base.v.map(([v, p]) => {
								if (!isValidElement(v)) return v;
							})}
						</sub>
						(
						{numData.Num.v.map(([v, p]) => {
							if (!isValidElement(v)) return v;
						})}
						)
					</span>
				);
				setNumData(registerInput(cache.numData, cache.pointer, val));
				setPointer(cache.pointer + 1);
				setCache({});
				setMode(
					Object.assign(mode, {
						logMode: false,
					})
				);
			} else if (mode.stoMode) {
				const stoIdx = numData.findIndex(
					([v, p]) =>
						isValidElement(v) && v.props.className.split(" ").includes("sto")
				);
				try {
					const a = numData.slice(0, stoIdx);
					const b = numData.slice(stoIdx + 1);
					const aMap = a.map(([v, p]) => {
						if (v === "ln(") return `log(`;
						else if (isValidElement(v) && v.props.className === "logValue") {
							return log(
								v.props.children[3][0],
								v.props.children[1].props.children[0]
							);
						} else if (v.type === "sup") {
							switch (v.props.className) {
								case "startexp":
									return "^(";
								case "startend":
									return `^(${v.props.children})`;
								case "start":
									return `^(${v.props.children}`;
								case "mid":
									return `${v.props.children}`;
								case "end":
									return `)`;
							}
						} else if (isValidElement(v) && !v.props.children) return;
						else if (isValidElement(v)) return "";
						else return v;
					});
					const bMap = b.map(([v, p]) => {
						if (isValidElement(v)) return "";
						if (/^[A-Z]*$/.test(v) && v.length > 0) return v;
						throw new TypeError();
					});
					const ans = evaluate(aMap.join(""));
					const variable = bMap.join("");
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
						setNumData([[<span>&nbsp;&nbsp;</span>, "pointer"]]);
						setPointer(0);
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
				const counter = 0;
				const n = numData.map(([v, p], i) => {
					if (/^[A-Z]*$/.test(v) && v.length > 0) {
						const val = vars.find((el) => el.id === v);
						if (!val) {
							return 0;
						} else return val.content;
					} else if (v === "e") return Math.E;
					else if (v === "ln(") return `log(`;
					else if (isValidElement(v) && v.props.className === "logValue") {
						return log(
							v.props.children[3][0],
							v.props.children[1].props.children[0]
						);
					} else if (v.type === "sup") {
						switch (v.props.className) {
							case "startexp":
								return "^(";
							case "startend":
								return `^(${v.props.children})`;
							case "start":
								console.log(`^(${v.props.children}`);
								return `^(${v.props.children}`;
							case "mid":
								console.log(`${v.props.children}`);
								return `${v.props.children}`;
							case "end":
								console.log(")");
								return `)`;
						}
					} else if (isValidElement(v) && !v.props.children) return;
					else if (isValidElement(v)) return "";
					else return v;
				});
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
						setNumData([[<span>&nbsp;&nbsp;</span>, "pointer"]]);
						setPointer(0);
					}
				} catch (e) {
					console.log(e);
				}
			}
		},
	};

	return (
		<div className='App'>
			<div className='frame'>
				<Screen
					data={on ? data : []}
					userInput={userInput}
					mode={mode}
					appOn={on}
					numData={numData}
					pointer={pointer}
				/>
				<Buttons
					buttonClickFns={on ? buttonClickFns : ""}
					mode={mode}
					turnOn={turnOn}
				/>
			</div>
		</div>
	);
};

export default App;
