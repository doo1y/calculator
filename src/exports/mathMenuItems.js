import insertExp from "../Actions/insertExp";

let mathMenuItems = {
	0: {
		1: () => "e4Frac", // Displays the answer as a fraction
		2: () => "e4Dec", // Displays the answer as a decimal
		3: (data) => insertExp(data, "^3"), // Calculates the cube
		4: (data) => registerInput(data, "3root"), // Calculates the cube root
		5: (data) => registerInput(data, "xroot"), // Calculates the xth root
		6: (data) => updateDataList(data, "fMin("), // Finds the minimum of a function
		7: (data) => updateDataList(data, "fMax("), // Finds the maximum of a function
		8: (data) => updateDataList(data, "nDeriv("), // Computes the numerical derivative of a function at a point
		9: (data) => updateDataList(data, "fnInt("), // Computes the numerical integral of a function over an interval
		0: (data) => updateDataList(data, "summation G("), // Computes the sum of an expression over an index
		A: (data) => updateDataList(data, "logBASE("), // Computes the logarithm of a specified value determined from a specified base: logBASE(value, base)
		B: (data) => updateDataList(data, "piecewise("), // Allows the entry of piecewise functions
		C: (data) => "Numeric Solver...", // Displays the equation solver
	},
	1: {
		1: (data) => (data, "abs("), // Absolute value
		2: (data) => (data, "round("), // Round
		3: (data) => (data, "iPart("), // Integer part
		4: (data) => (data, "fPart("), // Fractional part
		5: (data) => (data, "int("), // Greatest integer
		6: (data) => (data, "min("), // Minimum value
		7: (data) => (data, "max("), // Maximum value
		8: (data) => (data, "lcm("), // Least common multiple
		9: (data) => (data, "gcd("), // Greatest common divisor
		0: (data) => (data, "remainder("), // Reports the remainder as a whole number from a division of two whole numbers where the divisor is not zero
		A: () => "e4 n/d e3 4 Un/d", // Converts an improper fraction to a mixed number or a mixed number to an improper fraction
		B: () => "e4 F e3 4 D", // Converts a decimal to a fraction or a fraction to a decimal
		/**
		 * Displays the mixed number template in MathPrint™ mode.
		 * Displays a small u between the whole number and fraction in Classic mode.
		 * Use n/d to complete the mixed number.
		 */
		C: () => "Un/d",
		/**
		 * 	Displays the fraction template in MathPrint™ mode.
		 * Displays a thick fraction bar between the numerator and the denominator in Classic mode.
		 * Also accessible by pressing ƒ „.
		 */
		D: () => "n/d",
	},
	2: {
		1: () => "conj(", // Returns the complex conjugate.
		2: () => "real(", // Returns the real part.
		3: () => "imag(", // Returns the imaginary part.
		4: () => "angle(", // Returns the polar angle.
		5: () => "abs(", // Returns the magnitude (modulus)
		6: () => "e4Rect", // Displays the result in rectangular form
		7: () => "e4Polar", // Displays the result in polar form
	},
	3: {
		1: () => "rand", // Random-number generator
		2: () => "nPr", // Number of permutations
		3: () => "nCr", // Number of combinations
		4: () => "!", // Factorial
		5: () => "randInt(", //	Random-integer generator
		6: () => "randNorm(", // Random # from Normal distribution
		7: () => "randBin(", // Random # from Binomial distribution
		8: () => "randIntNoRep(", // Random ordered list of integers in a range
	},
	4: {
		/**
		 * 	Displays the fraction template in MathPrint™ mode.
		 *  Displays a thick fraction bar between the numerator and the denominator in Classic mode.
		 *  Also accessible by pressing ƒ „.
		 */
		1: () => "n/d",
		/**
		 *  Displays the mixed number template in MathPrint™ mode.
		 *  Displays a small u between the whole number and fraction in Classic mode. Use n/d to complete the mixed number.
		 */
		2: () => "Un/d",
		/**
		 *  Converts a decimal to a fraction or a fraction to a decimal.
		 */
		3: () => "e4 F e3 4 D",
		/**
		 *  Converts an improper fraction to a mixed number or a mixed number to an improper fraction.
		 */
		4: () => "e4 n/d e3 4 Un/d",
	},
};

export default mathMenuItems;
