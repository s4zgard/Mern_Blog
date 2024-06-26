import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  setUsername,
  setEmail,
  setPassword,
  setCurrentPassword,
  setProfilePicture,
  clearForm,
  formReducer,
} from "./slices/formSlice";

import {
  userReducer,
  signInLoading,
  signInSuccess,
  signInFailure,
  userUpdateStart,
  userUpdateFailure,
  userUpdateSuccess,
  userDeleteStart,
  userDeleteFailure,
  userDeleteSuccess,
} from "./slices/userSlice";

import { themeReducer, toggleTheme } from "./slices/themSlice";

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  form: formReducer,
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

export {
  signInLoading,
  signInSuccess,
  signInFailure,
  toggleTheme,
  userUpdateStart,
  userUpdateFailure,
  userUpdateSuccess,
  setUsername,
  setEmail,
  setPassword,
  setCurrentPassword,
  setProfilePicture,
  clearForm,
  userDeleteStart,
  userDeleteFailure,
  userDeleteSuccess,
};
export const persistor = persistStore(store);
