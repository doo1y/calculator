import { createSlice } from "@reduxjs/toolkit";

const defaultWindowSettings = [
	["xMin", -10], // smallest value of x in view on the x-axis
	["xMax", 10], // largest value of x in view on the x-axis
	["xScl", 1], // distance between tick marks on the x-axis
	["yMin", -10], // smallest value of y in view on the y-axis
	["yMax", 10], // largest value of y in view on the y-axis
	["yScl", 1], // distance between tick marks on the y-axis
	["xRes", 1], // determines the resolution of the graph
	// traceStep and freeTraceValue are linked together
	// traceStep is always twice as big as the freeTraceValue
	["freeTraceValue", 0.075757575757575],
	["traceStep", 0.015151515151515], // controls the X-value jump when tracing a function on a graph screen.
];

const windowSlice = createSlice({
	name: "window",
	initialState: {
		config: defaultWindowSettings,
	},
	reducers: {
		windowConfigured: (state, action) => {
			action.payload.forEach(
				(x, i) => (state.config[i][1] = x ? x : state.config[i][1])
			);
		},

		defaultWindowConfigRestored: (state) => {
			state.config = defaultWindowSettings;
		},
	},
});

export const { windowConfigured, defaultWindowConfigRestored } =
	windowSlice.actions;

export default windowSlice.reducer;
