import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    signInLoading: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userUpdateStart:(state,action)=>{
        state.isLoading = true
        state.error = null;
    },
    userUpdateSuccess:(state,action)=>{
        state.currentUser= action.payload;
        state.isLoading=false;
    },
    userUpdateFailure:(state,action)=>{
        state.error=action.payload,
        state.isLoading=false
    }

  },
});

export const userReducer = userSlice.reducer;
export const { signInLoading, signInSuccess, signInFailure, userUpdateStart,userUpdateFailure,userUpdateSuccess } =
  userSlice.actions;
