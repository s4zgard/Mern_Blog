import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  userReducer,
  signInLoading,
  signInSuccess,
  signInFailure,
} from "./slices/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
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

export { signInLoading, signInSuccess, signInFailure };
export const persistor = persistStore(store);
