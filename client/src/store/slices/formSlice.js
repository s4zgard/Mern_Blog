import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    username: "",
    email: "",
    password: "",
    currentPassword: "",
    profilePicture: "",
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setCurrentPassword: (state, action) => {
      state.currentPassword = action.payload;
    },
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
    clearForm: (state) => {
      state.username = null;
      state.email = null;
      state.password = null;
      state.currentPassword = null;
      state.profilePicture = null;
    },
  },
});

export const {
  setUsername,
  setEmail,
  setPassword,
  setCurrentPassword,
  setProfilePicture,
  clearForm,
} = formSlice.actions;
export const formReducer = formSlice.reducer;
