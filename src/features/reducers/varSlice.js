import { createSlice } from "@reduxjs/toolkit";

const varSlice = createSlice({
	name: "vars",
	initialState: { vars: [] },
	reducers: {
		varAdded(state, action) {
			const { id, content, clearAll } = action.payload;
			if (clearAll) state = [];
			else
				state.vars.push({
					id,
					content,
				});
		},
	},
});

export const { varAdded } = varSlice.actions;

export default varSlice.reducer;
