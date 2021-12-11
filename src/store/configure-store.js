import {configureStore} from '@reduxjs/toolkit'
import api from "../api/usgs/waterway-middleware"
import request from "./middleware/currentLocation"
import reducer from './reducer'
export default function(){
    return configureStore({
        reducer,
        middleware: (defaults) => defaults().concat([
            api, 
            request
        ])
    })
}