import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export const mathView = [
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
