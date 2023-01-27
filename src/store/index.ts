import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import userToCreateReducer from "./userToCreateSlice";
import entriesReducer from "./entriesSlice";
import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    userToCreate: userToCreateReducer,
    entries: entriesReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
