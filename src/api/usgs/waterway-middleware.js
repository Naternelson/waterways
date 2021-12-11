import Waterway from "./waterway"
import { waterwaysAdded, waterwaysLoaded, getWaterData } from "./waterways-slice"
const api = ({dispatch}) => next => async action => {
    next(action)
    if(action.type !== getWaterData.type) return 
    try{
        const list = await Waterway.retrieveArea(action.payload)
        dispatch(waterwaysAdded(Waterway.serialize(list)))
        dispatch(waterwaysLoaded())
    } catch(err) {
        console.error(err)
    }
}
export default api