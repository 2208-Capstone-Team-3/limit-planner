import { createSlice } from "@reduxjs/toolkit";

export interface goalsInitialStateType {
  goals: [];
}

const initialState: goalsInitialStateType = {
  goals: [],
};

export const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    setGoals: (state, action) => {
      state.goals = action.payload;
    },
    resetGoals: (state) => {
      state.goals = [];
    },
  },
});

export const { setGoals, resetGoals } = goalsSlice.actions;
export default goalsSlice.reducer;
