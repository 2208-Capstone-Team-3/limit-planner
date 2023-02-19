import { createSlice } from "@reduxjs/toolkit";

export interface skipdatesInitialStateType {
  skipdates: [];
}

const initialState: skipdatesInitialStateType = {
    skipdates: [],
};

export const skipdatesSlice = createSlice({
  name: "skipdates",
  initialState,
  reducers: {
    setSkipdates: (state, action) => {
      state.skipdates = action.payload;
    },
    resetSkipdates: (state) => {
      state.skipdates = [];
    },
  },
});

export const { setSkipdates, resetSkipdates } = skipdatesSlice.actions;
export default skipdatesSlice.reducer;
