import { createSlice } from "@reduxjs/toolkit";

const defaultWindowSettings = [
	["xMin", -10],
	["xMax", 10],
	["xScl", 1],
	["yMin", -10],
	["yMax", 10],
	["yScl", 1],
	["xRes", 1],
	["freeTraceValues", 0.075757575757575],
	["functionTraceValues", 0.015151515151515],
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
