// import { List, Skeleton, ListItem, ListItemText } from "@mui/material"
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import { useSelector, useStore } from 'react-redux';
import { Paper, Skeleton, Typography } from '@mui/material';
import { sortWaterwaysSelector } from '../../api/usgs/waterways-slice';

export default function WaterwayList() { 
    let {loading} = useSelector(s => s.entities.waterways)
    const store = useStore().getState()
    const data = sortWaterwaysSelector(store)
    // loading = true
    const listWaters = (waterways) => {
        // console.log(waterways)
        return waterways.map((w, i) => {
            // console.log({nae: w.name, id: w.id})
            return <Paper key={i} elevation={3}>
                <ListItem key={w.id}>
                    <ListItemText primary={w.name}/>
                </ListItem>
            </Paper>
        })
    }

    const skelton = () => {
        let arr = []
        for(let i = 0; i < 20; i ++){
            arr.push((<Typography variant="h3"  key={i}><Skeleton varient="rectangular" animation="wave" sx={{width: "200px;"}}/></Typography>))
        }
        return arr
    }
    return  (
        <Box >
            <List>
                {loading ? skelton() : listWaters(data)}
            </List>
        </Box>
    )
}