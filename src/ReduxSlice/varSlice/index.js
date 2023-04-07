import { createSlice } from "@reduxjs/toolkit";

const initialState = [{}];

const varSlice = createSlice({
	name: "vars",
	initialState,
	reducers: {
		addVar(state, action) {
			state.push(action.payload);
		},
	},
});

export const { addVar } = varSlice.actions;

export default varSlice.reducer;
