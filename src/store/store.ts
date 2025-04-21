import { configureStore } from "@reduxjs/toolkit";
import feedsReducer from "./slices/feeds/feedsSlice";
import appReducer from "./slices/app/appSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "feeds",
	storage,
};

const persistedReducer = persistReducer(persistConfig, feedsReducer);

export const store = configureStore({
	reducer: {
		feeds: persistedReducer,
		app: appReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
			},
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
