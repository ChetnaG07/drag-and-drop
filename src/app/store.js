import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { todosApiSlice } from "../features/api/todosApiSlice";

const store = configureStore({
	reducer: {
		[todosApiSlice.reducerPath]: todosApiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(todosApiSlice.middleware),
});

export default store;
