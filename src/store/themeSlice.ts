import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  theme: {
    homeDrawerOpen: boolean;
    dateSelector: Date | string;
    accountSelector: string;
    goalSelector: string | null;
  };
}

const initialState: initialStateType = {
  theme: {
    homeDrawerOpen: true,
    dateSelector: "05-05-2023",
    accountSelector: "",
    goalSelector: null,
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
    setAccountSelector: (state, action) => {
      state.theme.accountSelector = action.payload;
    },
    setGoalSelector: (state, action) => {
      state.theme.goalSelector = action.payload;
    },
    setLightorDark: (state, action) => {
      localStorage.setItem("colorModeCookie", action.payload);
    },
    resetTheme: (state) => {
      state.theme = {
        homeDrawerOpen: true,
        dateSelector: new Date(),
        accountSelector: "",
        goalSelector: null,
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
  setAccountSelector,
  setGoalSelector,
} = themeSlice.actions;
export default themeSlice.reducer;
