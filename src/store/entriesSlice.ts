import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    entries: {}
}

export const entriesSlice = createSlice({
    name: "entries",
    initialState,
    reducers: {
        setEntries: (state, action) => {
            state.entries = action.payload
        },
       
    }
})

export const { setEntries } = entriesSlice.actions
export default entriesSlice.reducer;
