import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: {
    mode: "light",
    colorscheme: "default",
  },
  pallete: {
    background: "#ffffff",
    foreground: "#262626",
    green: "#98971a",
    blue: "#458588",
    red: "#cc241d",
    gray: "#7c6f64",
    background_hard: "#ffffff",
    foreground_hard: "#282828",
    black: "#ffffff",
    white: "#000000",
  },
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfigReducer: (state, action) => {
      let { mode, colorscheme } = action.payload;
      state.theme = {
        mode,
        colorscheme,
      };
    },
    setPalleteReducer: (state, action) => {
      state.pallete = action.payload;
    },
  },
});

export const { setConfigReducer, setPalleteReducer } = configSlice.actions;

export default configSlice.reducer;
