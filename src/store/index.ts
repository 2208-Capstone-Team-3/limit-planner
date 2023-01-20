import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import userToCreateReducer from "./userToCreateSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    userToCreate: userToCreateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
