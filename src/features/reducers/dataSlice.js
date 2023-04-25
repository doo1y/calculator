import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
	name: "data",
	initialState: { dataArray: [] },
	reducers: {
		dataAdded: (state, action) => {
			state.dataArray.push(action.payload);
		},
		dataRemoved: (state) => {
			state.dataArray = [];
		},
	},
});

export const { dataAdded, dataRemoved } = dataSlice.actions;

export default dataSlice.reducer;
