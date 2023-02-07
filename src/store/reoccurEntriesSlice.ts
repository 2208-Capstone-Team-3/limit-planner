import { createSlice } from "@reduxjs/toolkit";

export interface entriesInitialStateType {
    reoccurEntries: [];
}

const initialState: entriesInitialStateType = {
  reoccurEntries: [],
};

export const reoccurEntriesSlice = createSlice({
  name: "reoccurEntries",
  initialState,
  reducers: {
    setReoccurEntries: (state, action) => {
      state.reoccurEntries = action.payload;
    },
    resetReoccurEntries: (state) => {
      state.reoccurEntries = [];
    },
  },
});

export const { setReoccurEntries, resetReoccurEntries } = reoccurEntriesSlice.actions;
export default reoccurEntriesSlice.reducer;
