import { configureStore } from "@reduxjs/toolkit";
import { api } from "./features/reducers/apiSlice";

import dataReducer from "./features/reducers/dataSlice";
import varReducer from "./features/reducers/varSlice";
import windowReducer from "./features/reducers/windowSlice";

export default configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		data: dataReducer,
		vars: varReducer,
		window: windowReducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});
