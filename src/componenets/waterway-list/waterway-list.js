// import { List, Skeleton, ListItem, ListItemText } from "@mui/material"
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Paper, Skeleton, Typography } from '@mui/material';
import { sortWaterwaysSelector } from '../../api/usgs/waterways-slice';
import converter from "conversions"
import { featureChanged } from '../../store/slices/ui-slice';

export default function WaterwayList() { 
    const dispatch = useDispatch()
    let {loading} = useSelector(s => s.entities.waterways)
    const store = useStore().getState()
    const data = sortWaterwaysSelector(store)
    const listWaters = (waterways) => {
        return waterways.map((w, i) => {
            let {name, distance, id} = w 
            const changeFeatured = () =>{
                dispatch(featureChanged(id))
            }
            distance = Math.round(converter(distance, "metres", "miles") * 10) / 10
            return <Paper key={i} elevation={3}>
                <ListItem key={w.id}>
                    <ListItemText onClick={changeFeatured} onFocus={changeFeatured} primary={name} secondary={`${distance} miles`}/>
                </ListItem>
            </Paper>
        })
    } 
    const skelton = () => {
        let arr = []
        for(let i = 0; i < 10; i ++){
            arr.push((<Typography variant="h3"  key={i}><Skeleton varient="rectangular" animation="wave"/></Typography>))
        }
        return arr
    }
    return  (
        <Box  >
            <List>
                {loading ? skelton() : listWaters(data)}
            </List>
        </Box>
    )
}