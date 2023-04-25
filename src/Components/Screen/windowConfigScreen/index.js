import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
const WindowConfigScreen = ({ pointer, windowValues }) => {
	const blankspace = <>&nbsp;&nbsp;</>;
	const fontAwesomeIcon = <FontAwesomeIcon icon={solid("caret-up")} />;
	const windowListItems = [
		"xMin=",
		"xMax=",
		"xScl=",
		"yMin=",
		"yMax=",
		"yScl=",
		"xRes=",
		"caret-up",
		"TraceStep=",
	].map((x, i) => {
		return (
			<li key={i} className={"window-config" + " " + windowValues[i][1]}>
				{x === "caret-up" ? (
					<>
						<FontAwesomeIcon icon={solid("caret-up")} />
						X=
					</>
				) : (
					x
				)}
				&nbsp;&nbsp;
				{windowValues[i][0].map(([x, p], ii) => (
					<span key={`${i}-${ii}`} className={p}>
						{x ? x : <>&nbsp;&nbsp;</>}
					</span>
				))}
			</li>
		);
	});
	return (
		<div className='screen'>
			<h2 className='window-title'>Window</h2>
			<ul className='windowList'>{windowListItems}</ul>
			<p className='info'>Press [Enter] to Set Log Values</p>
		</div>
	);
};

export default WindowConfigScreen;
