import { configureStore } from "@reduxjs/toolkit";

import dataReducer from "./ReduxSlice/dataSlice";
import varReducer from "./ReduxSlice/varSlice";

export default configureStore({
	reducer: { data: dataReducer, vars: varReducer },
});
