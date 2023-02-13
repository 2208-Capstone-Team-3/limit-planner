import { createSlice } from "@reduxjs/toolkit";

// interface entry {
//   id: string;
// }

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
    // deleteEntries: (state, action) => {
    //   const entryToDeleteId = action.payload
    //   state.entries = state.entries.filter(
    //     (entrys) => entrys.id !== entryToDeleteId
    //   );
    // },
  },
});

export const { setEntries, resetEntries } = entriesSlice.actions;
export default entriesSlice.reducer;
