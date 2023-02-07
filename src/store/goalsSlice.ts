import { createSlice } from "@reduxjs/toolkit";

export interface goalsInitialStateType {
  goals: [
    {
      id?: string;
      name: string;
      goalAmount: number;
      startAmount: number;
      startDate: Date;
      endDate: Date;
      victory: boolean;
    }
  ];
}

const initialState: goalsInitialStateType = {
  goals: [
    {
      name: "Undefined",
      goalAmount: 1,
      startAmount: 0,
      startDate: new Date(),
      endDate: new Date(),
      victory: false,
    },
  ],
};

export const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    setGoals: (state, action) => {
      state.goals = action.payload;
    },
    resetGoals: (state) => {
      state.goals = [
        {
          name: "Undefined",
          goalAmount: 1,
          startAmount: 0,
          startDate: new Date(),
          endDate: new Date(),
          victory: false,
        },
      ];
    },
  },
});

export const { setGoals, resetGoals } = goalsSlice.actions;
export default goalsSlice.reducer;
