import { createSlice } from "@reduxjs/toolkit";

const name = "ui"
const initialState = {
    featured: null, 
    mode: 'light',
    modes: ['dark', 'light'],
    backgroundThemes: {
        playful: ['#FFC09F', "#A0CED9", "#FFEE93", "#adf7b6", "#fcf5c7"],
        fishing: ['#9dd9d2', '#F6AA1C', '#1E1A1D', '#6F732F', '#96939B']
    },
    backgroundTheme: 'playful',
    autoScroll: true, 
    scrollTime: 30000,
    searchRadius: 50,
    maxRadius: 100,
    updateUnit: "minute",
    updateRate: 60
}


const slice = createSlice({
    name, 
    initialState, 
    reducers: {
        changeUi: (store, action) => {
            store = {...store, ...action.payload}
        },
        changeRadius: (store, action) => {
            store.searchRadius = action.payload 
        },
        changeAutoScroll: (store, action) => {
            store.autoScroll = !!action.payload
        },
        changeScrollTime: (store, action) => {
            if(typeof action.payload === 'number')  store.scrollTime = action.payload
        },
        featureChanged: (store, action) => {
            store.featured = action.payload
        },
        featuredReset: (store, action) => {
            store.featured = null 
        },
        changeMode: (store, action) => {
            if(store.modes.find(m => m === action.payload)) store.mode = action.payload
        },
        changeBackgroundTheme: (store, action) => {
            if(Object.keys(store.backgroundThemes).find(t => t === action.payload)) store.backgroundTheme = action.payload
        }
    }
})

export default slice.reducer
export const {changeRadius, changeUi, changeAutoScroll, changeScrollTime, featureChanged, featuredReset,changeMode, changeBackgroundTheme} = slice.actions
