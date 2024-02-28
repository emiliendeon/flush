import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SettingsStore = {
	showInstructions: boolean;
};

const initialState: SettingsStore = {
	showInstructions: true,
};

const SettingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		set: <T extends keyof SettingsStore>(
			state: SettingsStore,
			{ payload }: PayloadAction<{ settingId: T; value: SettingsStore[T] }>
		) => {
			return {
				...state,
				[payload.settingId]: payload.value,
			};
		},
	},
});

export const SettingsActions = SettingsSlice.actions;
export default SettingsSlice.reducer;
