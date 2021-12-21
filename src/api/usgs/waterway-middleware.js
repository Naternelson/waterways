import Waterway from "./waterway"
import { waterwaysAdded, waterwaysLoaded, getWaterData } from "./waterways-slice"
const api = store => next => async action => {
    const dispatch = store.dispatch 
    next(action)
    if(action.type !== getWaterData.type) return 
    try{
        const list = await Waterway.retrieveArea(action.payload)
        dispatch(waterwaysAdded(Waterway.serialize(list)))
        setTimeout(()=> dispatch(waterwaysLoaded()), 2000)
    } catch(err) {
        console.error(err)
        if(Object.keys(store.getState().entities.waterways.data).length > 0) dispatch(waterwaysLoaded())
    }
}
export default api