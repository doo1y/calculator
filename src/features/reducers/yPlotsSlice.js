import { createSlice } from "@reduxjs/toolkit";

const yPlotsSlice = createSlice({
	name: "yPlots",
	initialState: {
		yValues: [
			[[1, null], false],
			[[2, null], false],
			[[3, null], false],
			[[4, null], false],
			[[5, null], false],
			[[6, null], false],
			[[7, null], false],
			[[8, null], false],
			[[9, null], false],
			[[0, null], false],
		],
	},
	reducers: {
		yPlotsAdded: (state, action) => {
			action.payload.forEach(([[x, y], z], i) => {
				state.yValues[i][0][1] = y ? y : state.yValues[i][0][1];
				state.yValues[i][1] = z ? z : false;
			});
			console.log(JSON.stringify(state.yValues));
		},
	},
});

export const { yPlotsAdded } = yPlotsSlice.actions;

export default yPlotsSlice.reducer;
