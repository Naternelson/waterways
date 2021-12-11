import { locationChanged } from "../../api/usgs/waterways-slice"
import { createAction } from "@reduxjs/toolkit"
const request = ({dispatch}) => next => async (action) => {
    if(action.type !== "locationRequest") return next(action)
    navigator.geolocation.getCurrentPosition((pos) => {
        const {latitude, longitude} = pos
        dispatch(locationChanged({latitude, longitude}))
    })
}
export default request
export const requestLocation = createAction("locationRequest")