// themSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState, // Ensure the initial state is correctly set
  reducers: {
    toggleTheme(state) {
      return {
        // Create a new object that copies the old state, but with a modified 'theme'
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
