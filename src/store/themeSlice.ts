import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  theme: {
    homeDrawerOpen: boolean;
    lightOrDark: string;
  };
}

const initialState: initialStateType = {
  theme: {
    homeDrawerOpen: true,
    lightOrDark: "light",
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
    resetTheme: (state) => {
      state.theme = {
        homeDrawerOpen: true,
        lightOrDark: "light",
      };
    },
  },
});

export const { setTheme, setHomeDrawerOpen, resetTheme } = themeSlice.actions;
export default themeSlice.reducer;
