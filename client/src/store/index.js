import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  userReducer,
  signInLoading,
  signInSuccess,
  signInFailure,userUpdateStart,userUpdateFailure,userUpdateSuccess
} from "./slices/userSlice";

import { themeReducer, toggleTheme } from "./slices/themSlice";

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: "root ",
  storage,
  versrion: 1,
};

const presistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: presistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export { signInLoading, signInSuccess, signInFailure, toggleTheme,userUpdateStart,userUpdateFailure,userUpdateSuccess };
export const persistor = persistStore(store);
