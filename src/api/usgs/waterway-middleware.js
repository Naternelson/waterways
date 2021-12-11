import Waterway from "./waterway"
import { waterwaysAdded, waterwaysLoaded } from "./waterways-slice"
const api = ({dispatch}) => next => async action => {
    if(action.type !== 'apiCallBegan') return next(action)
    try{
        const list = await Waterway.retrieveArea(action.payload)
        dispatch(waterwaysAdded(Waterway.serialize(list)))
        dispatch(waterwaysLoaded())
    } catch(err) {
        console.log(err)
    }
}
export default api