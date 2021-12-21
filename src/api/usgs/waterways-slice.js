import { createSlice, createAction } from "@reduxjs/toolkit";
import {getDistance} from "geolib"
import converter from 'conversions'

const name = "waterways"
const initialState = {
    location: {},
    loading: true,
    data: {}
}

export const getWaterData = createAction("waterways/api/callBegan")

const slice = createSlice({
    name, 
    initialState, 
    reducers: {
        locationChanged: (store, action) => {
            const {latitude, longitude, state} = action.payload
            store.location = {latitude, longitude,state}
        },
        waterwayAdded: (store, action) => {
            const id = action.payload.id 
            store.data[id] = action.payload 
        },
        waterwayDeleted: (store, action) => {
            const id = action.payload
            delete store.data[id]
        },
        waterwaysAdded: (store, action) => {
            let {payload} = action 
            if(Array.isArray(action.payload)){
                payload = action.payload.reduce((obj, el) => {
                    obj[el.id] = el 
                    return obj 
                },{})
            }

            store.data = {...store.data, ...payload}
        },
        waterwaysDeleted: (store, action) => {
            let payload = action.payload
            if(Array.isArray(payload)){
                if(payload[0].id) {
                    payload = action.payload.map((el)=> el.id)}
            } else {
                payload = Object.keys(action.payload)
            }
            payload.forEach((id)=>{
                delete store.data[id]
            })
        },
        waterwaysLoading: (store) => {
            store.loading = true 
        },
        waterwaysLoaded: (store)=>{
            store.loading = false 
        },
        waterwaysReset: (store)=>{
            return initialState
        }
    }
})

export default slice.reducer
export const {locationChanged,waterwayAdded,waterwayDeleted,waterwaysAdded,waterwaysDeleted,waterwaysLoading,waterwaysLoaded,waterwaysReset} = slice.actions

export const waterwaysAsArraySelector = store => {
    const {data} = store.entities.waterways 
    return Object.entries(data).map(([key,value]) => value)
}
export const sortWaterwaysSelector = (store, closestFirst=true, radius=-1) => {
    const {location} = store.entities.waterways
    const arr = waterwaysAsArraySelector(store)
    if(!location.latitude) return arr  
    const sortedArr =  arr.sort((a, b) => {
        const distanceA = getDistance(location, a.coord)
        const distanceB = getDistance(location, b.coord)
        if(closestFirst){
            return distanceA-distanceB
        } else {
            return distanceB-distanceA
        }
    })
    if(radius < 0) return sortedArr
    return sortedArr.filter(el => {
        return el.distance < converter(radius, "miles", "metres")  
    })
}
export const sortByNSWaterwaysSelector = (store, NtoS = true) => {

}

