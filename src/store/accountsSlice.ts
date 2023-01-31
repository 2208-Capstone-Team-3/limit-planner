import { createSlice } from "@reduxjs/toolkit";

export interface accountsInitialStateType {
  accounts: {};
}

const initialState: accountsInitialStateType = {
  accounts: {},
};

export const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setAccounts: (state, action) => {
      state.accounts = { ...action.payload };
    },
    resetAccounts: (state) => {
      state.accounts = {};
    },
  },
});

export const { setAccounts, resetAccounts } = accountsSlice.actions;
export default accountsSlice.reducer;
