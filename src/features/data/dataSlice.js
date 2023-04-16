import { createSlice } from "@reduxjs/toolkit";

const initialState = [{}];

const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		dataAdded(state, action) {
			state.push(action.payload);
		},
	},
});

export const { dataAdded } = dataSlice.actions;

export default dataSlice.reducer;
