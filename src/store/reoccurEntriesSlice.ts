import { createSlice } from "@reduxjs/toolkit";
import { EntryAttributes } from "../../server/db/models/Entry.model";

export interface reoccurEntry extends EntryAttributes {
  accountId: string;
}

export interface entriesInitialStateType {
  reoccurEntries: reoccurEntry[];
};

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
    deleteReoccurEntries: (state, action) => {
      const reoccurrEntryToDeleteId = action.payload
      state.reoccurEntries = state.reoccurEntries.filter(
        (entries) => entries.id !== reoccurrEntryToDeleteId
      );
    },
  },
});

export const { setReoccurEntries, resetReoccurEntries, deleteReoccurEntries } = reoccurEntriesSlice.actions;
export default reoccurEntriesSlice.reducer;
