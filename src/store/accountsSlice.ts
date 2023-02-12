import { createSlice } from "@reduxjs/toolkit";

export interface accountsInitialStateType {
  accounts: [
    {
      goals?: [];
      entries?: [];
      userId?: string;
      id?: string;
      accountType: string;
      accountName: string;
      institution: string;
      balance: number;
    }
  ];
}

const initialState: accountsInitialStateType = {
  accounts: [
    {
      accountType: "Undefined",
      accountName: "Undefined",
      institution: "Undefined",
      balance: 0,
    },
  ],
};

export const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    resetAccounts: (state) => {
      state.accounts = [
        {
          accountType: "Undefined",
          accountName: "Undefined",
          institution: "Undefined",
          balance: 0,
        },
      ];
    },
  },
});

export const { setAccounts, resetAccounts } = accountsSlice.actions;
export default accountsSlice.reducer;
