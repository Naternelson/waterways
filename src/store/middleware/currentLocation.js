import { locationChanged } from "../../api/usgs/waterways-slice"
import { createAction } from "@reduxjs/toolkit"
const request = ({dispatch}) => next => async (action) => {
    next(action)
    if(action.type !== requestLocation.type) return
    navigator.geolocation.getCurrentPosition((pos) => {
        const {latitude, longitude} = pos.coords
        dispatch(locationChanged({latitude, longitude}))
    }, (error) => {
        console.error(error)
    })
}
export default request
export const requestLocation = createAction("ui/locationRequest")