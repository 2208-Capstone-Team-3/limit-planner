import { createSlice } from "@reduxjs/toolkit";

export interface entriesInitialStateType {
  entries: [];
}

const initialState: entriesInitialStateType = {
  entries: [],
};

export const entriesSlice = createSlice({
  name: "entries",
  initialState,
  reducers: {
    setEntries: (state, action) => {
      state.entries = action.payload;
    },
    resetEntries: (state) => {
      state.entries = [];
    },
  },
});

export const { setEntries, resetEntries } = entriesSlice.actions;
export default entriesSlice.reducer;
