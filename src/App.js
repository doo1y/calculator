// TODO: Refactor the registerInput function so that value is modified BEFORE it is passed down as it's argument
// TODO: Refactor ALL functions so that ALL values used as arguments are changed before, not within
// TODO: Refactor what happens when ENTER is clicked

import {
	useState,
	useEffect,
	useMemo,
	isValidElement,
	createElement,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { dataAdded } from "./dataSlice";
import Screen from "./Components/Screen";
import Buttons from "./Components/Buttons";
import { evaluate, log } from "mathjs";
import "./App.css";

// function which handles how the pointer should be moved, left or right
function leftRight(d, n, p) {
	n[p][1] = "";
	if (d === "left") n[p - 1][1] = "pointer";
	else n[p + 1][1] = "pointer";
	return n;
}

// function which outputs input to screen whenever valid button is clicked
const renderInput = (numData, logMode) => {
	if (logMode) {
		return {
			base: numData.Base.v.map(([c, p], i) => (
				<span key={i} className={p}>
					{c}
				</span>
			)),
			n: numData.Num.v.map(([c, p], i) => (
				<span key={i} className={p}>
					{c}
				</span>
			)),
		};
	}
	return numData.map(([c, p], i) => (
		<span key={i} className={p}>
			{c}
		</span>
	));
};

const registerInput = (n, p, v) => {
	let val =
		v === "^2" || v === "^-1" ? createElement("sup", {}, v.slice(1)) : v;
	n[p] = [val, ""];
	if (p === n.length - 1) n.push([<span>&nbsp;&nbsp;</span>, "pointer"]);
	else n[p + 1] = [n[p + 1][0], "pointer"];
	return n;
};

const changeFocus = (arr) => {
	const idx = arr.findIndex(([v, p]) => p === "pointer");
	if (idx >= 0) {
		arr[idx][1] = "";
	} else arr[arr.length - 1][1] = "pointer";
	return arr;
};

const delVal = (n, p) => {
	if (p === n.length - 1) {
		n.splice(p - 1, 1);
	} else if (p !== n.length - 1) {
		n[p - 1][1] = "pointer";
		n.splice(p, 1);
	}
	return n;
};

const App = () => {
	const [cache, setCache] = useState({});
	const [numData, setNumData] = useState([
		[<span>&nbsp;&nbsp;</span>, "pointer"],
	]);
	const [logMode, setLogMode] = useState(false);
	const [pointer, setPointer] = useState(0);
	const data = useSelector((state) => state.data);
	const dispatch = useDispatch();

	const userInput = useMemo(
		() => renderInput(numData, logMode),
		[numData, pointer]
	);

	const buttonClickFns = {
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
			}
		},
		onGenClick: (e) => {
			e.preventDefault();
			if (!logMode) {
				setNumData(registerInput(numData, pointer, e.currentTarget.value));
				setPointer(pointer + 1);
			}
		},
		onGenClickLog: (e) => {
			e.preventDefault();
			setNumData({
				Base: {
					v: numData.Base.focused
						? registerInput(numData.Base.v, pointer, e.currentTarget.value)
						: numData.Base.v,
					focused: numData.Base.focused,
				},
				Num: {
					v: numData.Num.focused
						? registerInput(numData.Num.v, pointer, e.currentTarget.value)
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
			setNumData([[<span>&nbsp;&nbsp;</span>, "pointer"]]);
			setPointer(0);
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
			} else setNumData(delVal(numData, pointer));
			setPointer(pointer - 1);
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
			} else {
				const n = numData.map(([v, p]) => {
					if (v === "ln(") return `log(`;
					else if (isValidElement(v) && v.props.className === "logValue") {
						return log(
							v.props.children[3][0],
							v.props.children[1].props.children[0]
						);
					} else if (v.type === "sup") return `^${v.props.children}`;
					else if (isValidElement(v) && !v.props.children) return;
					else if (isValidElement(v)) return "";
					else return v;
				});
				console.log(n.join(""));
				try {
					const ans = evaluate(n.join(""));
					if (ans && numData.length) {
						dispatch(
							dataAdded({
								id: nanoid(),
								content: ans,
								type: "alphnum",
							})
						);
						setNumData([[<span>&nbsp;&nbsp;</span>, "pointer"]]);
						setPointer(0);
					}
				} catch (e) {
					console.log(e);
					setError(typeof e);
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
				<Screen data={data} inputs={inputs} logMode={logMode} />

				<Buttons buttonClickFns={buttonClickFns} logMode={logMode} />
			</div>
		</div>
	);
};

export default App;
