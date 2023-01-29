import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    singleEntry: {}
}

export const singleEntrySlice = createSlice({
    name: "singleEntry",
    initialState,
    reducers: {
        setSingleEntrie: (state, action) => {
            state.entries = action.payload
        },
       
    }
})

export const { setSingleEntrie } = singleEntrySlice.actions
export default singleEntrySlice.reducer;
