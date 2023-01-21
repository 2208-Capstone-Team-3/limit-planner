import { createSlice } from "@reduxjs/toolkit";
import { PlaceType } from "../Components/UserCreation/UserGoogleLocation";

interface initialStateType {
  userToCreate: { address: PlaceType | null };
}

const initialState: initialStateType = {
    userToCreate: { address: null },
};

export const createUserSlice = createSlice({
  name: "userToCreate",
  initialState,
  reducers: {
    setUserToCreate: (state, action) => {
      state.userToCreate = action.payload;
    },
  },
});

export const { setUserToCreate } = createUserSlice.actions;
export default createUserSlice.reducer;
