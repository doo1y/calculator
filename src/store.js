import { configureStore } from "@reduxjs/toolkit";
import { api } from "./features/api/apiSlice";

import dataReducer from "./features/data/dataSlice";
import varReducer from "./features/var/varSlice";
import windowReducer from "./features/window/windowSlice";

export default configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		data: dataReducer,
		vars: varReducer,
		windowConfig: windowReducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});
