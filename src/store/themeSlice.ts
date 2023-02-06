import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  theme: {
    homeDrawerOpen: boolean;
    dateSelector: Date | string;
  };
}

const initialState: initialStateType = {
  theme: {
    homeDrawerOpen: true,
    dateSelector: "05-05-2023",
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
    setDateSelector: (state, action) => {
      state.theme.dateSelector = action.payload;
    },
    setLightorDark: (state, action) => {
      localStorage.setItem("colorModeCookie", action.payload);
    },
    resetTheme: (state) => {
      state.theme = {
        homeDrawerOpen: true,
        dateSelector: new Date(),
      };
    },
  },
});

export const {
  setTheme,
  setHomeDrawerOpen,
  setLightorDark,
  resetTheme,
  setDateSelector,
} = themeSlice.actions;
export default themeSlice.reducer;
