import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const varSlice = createSlice({
	name: "vars",
	initialState,
	reducers: {
		varAdded(state, action) {
			const { id, content } = action.payload;
			state.push({
				id,
				content,
			});
		},
	},
});

export const { varAdded } = varSlice.actions;

export default varSlice.reducer;
