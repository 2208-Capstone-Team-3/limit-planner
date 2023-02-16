import { createSlice } from "@reduxjs/toolkit";
import { PlaceType } from "../Components/UserCreation/UserGoogleLocation";

export interface userInitialStateType {
  user: {
    username: string | null;
    address: PlaceType | null;
    fullName: string | null;
    id: string | null;
    password: string | null;
    firstName: string | null;
    lastName: string | null;
    phoneNum: string | null;
    email: string | null;
    birthday: Date | null;
    avatarUrl: string | null;
    isAdmin: boolean | null;
    createdAt: string | null;
    updatedAt: string | null;
  };
}

const initialState: userInitialStateType = {
  user: {
    username: null,
    address: null,
    fullName: null,
    id: null,
    password: null,
    firstName: null,
    lastName: null,
    phoneNum: null,
    email: null,
    birthday: null,
    avatarUrl: null,
    isAdmin: true,
    createdAt: null,
    updatedAt: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...action.payload };
    },
    resetUser: (state) => {
      state.user = {
        username: null,
        address: null,
        fullName: null,
        id: null,
        password: null,
        firstName: null,
        lastName: null,
        phoneNum: null,
        email: null,
        birthday: null,
        avatarUrl: null,
        isAdmin: false,
        createdAt: null,
        updatedAt: null,
      };
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
