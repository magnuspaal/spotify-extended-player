import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface INotification {
	open: boolean;
	message: string;
}

export const counterSlice = createSlice({
	name: "auth",
	initialState: {
		open: false,
		message: "",
	},
	reducers: {
		setNotification: (state, action: PayloadAction<INotification>) => {
			state.open = action.payload.open;
			state.message = action.payload.message;
		},
	},
});

export const { setNotification } = counterSlice.actions;

export default counterSlice.reducer;
