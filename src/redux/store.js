import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { apiHooks } from "services/apiHooks";

import storage from "redux-persist/lib/storage";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import authReducer from "./auth/authSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [apiHooks.reducerPath],
};

const reducers = combineReducers({
  [apiHooks.reducerPath]: apiHooks.reducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const makeStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApiSlice.middleware),
});

export const persistor = persistStore(makeStore);
