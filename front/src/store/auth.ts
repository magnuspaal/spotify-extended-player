import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
	name: "auth",
	initialState: {
		token: "",
		secret: "",
	},
	reducers: {
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
		setSecret: (state, action: PayloadAction<string>) => {
			state.secret = action.payload;
		},
	},
});

export const { setToken, setSecret } = counterSlice.actions;

export default counterSlice.reducer;
