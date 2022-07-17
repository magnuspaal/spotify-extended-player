import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import notification from "./notification";

export const store = configureStore({
	reducer: {
		auth,
		notification,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
