// TODO: Refactor the registerInput function so that value is modified BEFORE it is passed down as it's argument
// TODO: Refactor ALL functions so that ALL values used as arguments are changed before, not within
// TODO: Refactor what happens when ENTER is clicked

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState, useMemo, isValidElement, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { evaluate, log } from "mathjs";
import { addData } from "./ReduxSlice/dataSlice";
import { addVar } from "./ReduxSlice/varSlice";
import Screen from "./Components/Screen";
import Buttons from "./Components/Buttons";
import changeFocus from "./Actions/changeFocus";
import delVal from "./Actions/delVal";
import leftRight from "./Actions/leftRight";
import registerInput from "./Actions/registerInput";
import renderInput from "./Actions/renderInput";
import "./App.css";

const App = () => {
	const [cache, setCache] = useState({});
	const [numData, setNumData] = useState([
		[<span>&nbsp;&nbsp;</span>, "pointer"],
	]);
	const [secMode, setSecMode] = useState(false);
	const [logMode, setLogMode] = useState(false);
	const [pointer, setPointer] = useState(0);
	const [alphaMode, setAlphaMode] = useState({ a: false, lock: false });
	const [stoMode, setStoMode] = useState(false);
	const [on, setOn] = useState(false);
	const data = useSelector((state) => state.data);
	const vars = useSelector((state) => state.vars);
	const dispatch = useDispatch();

	const userInput = useMemo(
		() => renderInput(numData, logMode),
		[numData, pointer]
	);

	const turnOn = (e) => {
		e.preventDefault();
		setOn(!on);
	};

	const buttonClickFns = {
		secBtnClick: (e) => {
			e.preventDefault();
			setSecMode(!secMode);
		},
		modeBtnClick: (e) => {
			e.preventDefault();
			if (secMode) {
				if (logMode) {
					setNumData(cache.numData);
					setPointer(cache.pointer);
					setCache({});
					setLogMode(false);
				}
			}
		},
		alphaClick: (e) => {
			e.preventDefault();
			secMode && alphaMode.a
				? setAlphaMode({ a: false, lock: false })
				: secMode
				? setAlphaMode({ a: true, lock: true })
				: setAlphaMode({ a: !alphaMode.a, lock: false });
			if (secMode) setSecMode(!secMode);
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
			setStoMode(true);
			setPointer(pointer + 1);
		},
		leftClick: (e) => {
			e.preventDefault();
			if (pointer > 0) {
				setNumData(leftRight("left", numData, pointer));
				setPointer(pointer - 1);
			}
		},
		rightClick: (e) => {
			e.preventDefault();
			if (pointer < numData.length - 1) {
				setNumData(leftRight("right", numData, pointer));
				setPointer(pointer + 1);
			}
		},
		upDownClick: (e) => {
			e.preventDefault();
			if (logMode) {
				let newData = {
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
					newData.Base.v = changeFocus(numData.Base.v);
					newData.Num.v = changeFocus(numData.Num.v);
					setPointer(newData.Base.v.length - 1);
				} else {
					newData.Base.v = changeFocus(numData.Base.v);
					newData.Num.v = changeFocus(numData.Num.v);
					setPointer(newData.Num.v.length - 1);
				}
				setNumData(newData);
			} else {
				if (!Object.keys(cache).length) {
					setCache({ numData: numData, pointer: pointer });
					setPointer(data.length - 1);
					setNumData();
					// Array.from(data[pointer].content.toString()).map(x => <span>x</span>)
				}
			}
		},
		onGenClick: (e) => {
			e.preventDefault();
			const values = e.currentTarget.value.split(",");
			let val;
			if (!alphaMode.a) val = values[1];
			else val = values[2];
			setNumData(registerInput(numData, pointer, val));
			setPointer(pointer + 1);
			if (secMode) setSecMode(!secMode);
			if (alphaMode.a && !alphaMode.lock)
				setAlphaMode({ a: !alphaMode.a, lock: false });
		},
		onGenClickLog: (e) => {
			e.preventDefault();
			const values = e.currentTarget.value.split(",");
			setNumData({
				Base: {
					v: numData.Base.focused
						? registerInput(numData.Base.v, pointer, values[1])
						: numData.Base.v,
					focused: numData.Base.focused,
				},
				Num: {
					v: numData.Num.focused
						? registerInput(numData.Num.v, pointer, values[1])
						: numData.Num.v,
					focused: numData.Num.focused,
				},
			});
			setPointer(pointer + 1);
		},
		onLogClick: (e) => {
			e.preventDefault();
			if (!logMode) {
				setCache({ numData: numData, pointer: pointer });
				setNumData({
					Base: { v: [[<span>&nbsp;&nbsp;</span>, "pointer"]], focused: true },
					Num: { v: [[<span>&nbsp;&nbsp;</span>, ""]], focused: false },
				});
				setPointer(0);
				setLogMode(true);
			}
		},
		onClearClick: (e) => {
			e.preventDefault();
			if (logMode) {
				setNumData(cache.numData);
				setPointer(cache.pointer);
				setCache({});
				setLogMode(false);
			} else {
				setNumData([[<span>&nbsp;&nbsp;</span>, "pointer"]]);
				setPointer(0);
			}
		},
		onDelClick: (e) => {
			e.preventDefault();
			if (logMode) {
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
			} else if (!logMode) {
				setNumData(delVal(numData, pointer));
				setPointer(pointer - 1);
			}
		},
		onEnterClick: async (e) => {
			e.preventDefault();
			if (logMode) {
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
				setLogMode(false);
			} else if (stoMode) {
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
								case "startend":
									console.log(`^(${v.props.children})`);
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
					const bMap = b.map(([v, p]) => {
						if (isValidElement(v)) return "";
						if (/^[A-Z]*$/.test(v) && v.length > 0) return v;
						throw new TypeError();
					});
					const ans = evaluate(aMap.join(""));
					const variable = bMap.join("");
					if (ans && variable) {
						dispatch(
							addVar({
								id: variable,
								content: ans,
							})
						);
						dispatch(
							addData({
								id: nanoid(),
								content: ans,
							})
						);
						setNumData([[<span>&nbsp;&nbsp;</span>, "pointer"]]);
						setPointer(0);
						setStoMode(false);
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
							case "startend":
								console.log(`^(${v.props.children})`);
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
							addData({
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

	const inputs = !logMode ? (
		<span className='user-input'>
			<p className='input'>{userInput}</p>
		</span>
	) : (
		<div className='logScreen'>
			<p className={"log" + (numData.Base.focused ? " selected" : "")}>
				Base: <span className='log-base'>{userInput.base}</span>
			</p>
			<p className={"log" + (numData.Num.focused ? " selected" : "")}>
				Num: <span className='log-n'>{userInput.n}</span>
			</p>
			<p className='info'>Press [Enter] to Set Log Values</p>
		</div>
	);

	return (
		<div className='App'>
			<div className='frame'>
				<Screen
					data={on ? data : []}
					inputs={on ? inputs : []}
					logMode={logMode}
					appOn={on}
				/>

				<Buttons
					buttonClickFns={on ? buttonClickFns : ""}
					logMode={logMode}
					turnOn={turnOn}
					alphaMode={alphaMode}
					secMode={secMode}
				/>
			</div>
		</div>
	);
};

export default App;
