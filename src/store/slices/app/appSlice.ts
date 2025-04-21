import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
	isDrawerOpen: boolean;
}

const initialState: AppState = {
	isDrawerOpen: false,
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setDrawerOpen: (state, action: PayloadAction<boolean>) => {
			state.isDrawerOpen = action.payload;
		},
	},
});

export const { setDrawerOpen } = appSlice.actions;
export default appSlice.reducer;
