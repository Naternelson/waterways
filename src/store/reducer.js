import { combineReducers } from "redux";
import entities from './entities-reducer'
import ui from "./slices/ui-slice"

export default combineReducers({
    entities,
    ui
})