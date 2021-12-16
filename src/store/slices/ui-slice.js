import { createSlice } from "@reduxjs/toolkit";

const name = "ui"
const initialState = {
    featured: null 
}


const slice = createSlice({
    name, 
    initialState, 
    reducers: {
        featureChanged: (store, action) => {
            store.featured = action.payload
        },
        featuredReset: (store, action) => {
            store.featured = null 
        }
    }
})

export default slice.reducer
export const {featureChanged, featuredReset} = slice.actions
