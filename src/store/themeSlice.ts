import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  theme: {
    homeDrawerOpen: boolean;
    dateSelector: Date | string;
    accountSelector:     {
      goals?: [];
      entries?: [];
      userId?: string;
      id?: string;
      accountType: string;
      accountName: string;
      institution: string;
      balance: number;
    } | null;
    goalSelector: {
      id?: string;
      accountId?: string;
      name: string;
      goalAmount: number;
      endDate: Date;
      victory: boolean;
    } | null;
    filteredEntries:any[];
    filteredGoals:any[];
    projection:number;
  };
}

const initialState: initialStateType = {
  theme: {
    homeDrawerOpen: true,
    dateSelector: "05-05-2023",
    accountSelector: null,
    goalSelector: null,
    filteredEntries:[],
    filteredGoals:[],
    projection:0
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
    setFilteredEntries: (state, action) => {
      state.theme.filteredEntries = action.payload;
    },
    setFilteredGoals: (state, action) => {
      state.theme.filteredGoals = action.payload;
    },
    setProjection: (state, action) => {
      state.theme.projection = action.payload;
    },
    resetTheme: (state) => {
      state.theme = {
        homeDrawerOpen: true,
        dateSelector: new Date(),
        accountSelector: null,
        goalSelector: null,
        filteredEntries:[],
        filteredGoals:[],
        projection:0
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
  setFilteredEntries,
  setFilteredGoals,
  setProjection,
} = themeSlice.actions;
export default themeSlice.reducer;
