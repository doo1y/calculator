import { createSlice } from "@reduxjs/toolkit";

const initialState = [
	{
		id: "defaultWindowConfig",
		setting: {
			xMin: -10,
			xMax: 10,
			xScl: 1,
			yMin: -10,
			yMax: 10,
			yScl: 1,
			xRes: 1,
		},
	},
];

const windowSlice = createSlice({
	name: "windowConfig",
	initialState,
	reducers: {
		windowConfigured(state, action) {
			const { id, setting } = action.payload;
			const defaultWindowConfig = state.find(
				({ id }) => id === "defaultWindowConfig"
			);

			for (const [key, value] of Object.entries(defaultWindowConfig.setting)) {
				if (!setting[key]) setting[key] = value;
			}

			const userWindowConfig = state.find(
				({ id }) => id === "userWindowConfig"
			);

			if (userWindowConfig) {
				userWindowConfig.setting = setting;
			} else state.push({ id, setting });
		},
	},
});

export const { windowConfigured } = windowSlice.actions;

export default windowSlice.reducer;
