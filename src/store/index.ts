import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import userToCreateReducer from "./userToCreateSlice";
import entriesReducer from "./entriesSlice";
import themeReducer from "./themeSlice";
import accountsReducer from "./accountsSlice";
import goalsReducer from "./goalsSlice";
import reoccurEntriesReducer from "./reoccurEntriesSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    userToCreate: userToCreateReducer,
    entries: entriesReducer,
    theme: themeReducer,
    accounts: accountsReducer,
    goals: goalsReducer,
    reoccurEntries: reoccurEntriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
