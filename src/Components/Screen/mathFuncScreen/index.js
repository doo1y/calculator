import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const MathFuncScreen = ({ pointer, mathView }) => {
	const mathOptions = Array.prototype.map.call(mathView, (x, i) => {
		return (
			<td className='mathScreen-body' key={`${x.n}`}>
				{Array.prototype.map.call(x.v, (o, i) => {
					const key = Object.keys(o)[0],
						value = o[key];
					return (
						<span
							height='23.117px'
							className={String(pointer[1]) === key ? "mathMode_selected" : ""}
							key={`${i}-${key}`}
							value={`${x.n}-${key}`}>
							{key}: {value}
						</span>
					);
				})}
			</td>
		);
	});

	return (
		<div className='screen mathScreen'>
			<table>
				<thead className='mathScreen-head'>
					<tr>
						{Array.prototype.map.call(mathView, (x, i) => (
							<th
								key={i}
								className={`tableHeaders ${
									pointer[0] === i ? "mathMode_selected" : ""
								}`}>
								{x.n}
							</th>
						))}
					</tr>
				</thead>
				<tbody className='mathScreen-body'>
					<tr>{mathOptions[pointer[0]]}</tr>
				</tbody>
			</table>
		</div>
	);
};

export default MathFuncScreen;
