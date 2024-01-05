/* eslint @typescript-eslint/no-restricted-imports: 0 */

import {
	type TypedUseSelectorHook,
	useDispatch as useDispatchRR,
	useSelector as useSelectorRR,
} from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import GameReducer from "./reducers/game";

const rootReducer = combineReducers({
	game: GameReducer,
});

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== "production",
});

export type Store = ReturnType<typeof store.getState>;
export const useDispatch: () => typeof store.dispatch = useDispatchRR;
export const useSelector: TypedUseSelectorHook<Store> = useSelectorRR;

export default store;
