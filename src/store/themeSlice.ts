import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  theme: {
    homeDrawerOpen: boolean;
  };
}

const initialState: initialStateType = {
  theme: {
    homeDrawerOpen: true,
  },
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setHomeDrawerOpen: (state, action) => {
      state.theme.homeDrawerOpen = action.payload;
    },
    setLightorDark: (state, action) => {
      localStorage.setItem("colorModeCookie", action.payload)
    },
    resetTheme: (state) => {
      state.theme = {
        homeDrawerOpen: true,
      };
    },
  },
});

export const { setTheme, setHomeDrawerOpen, setLightorDark, resetTheme } = themeSlice.actions;
export default themeSlice.reducer;
