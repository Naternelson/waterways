// import { List, Skeleton, ListItem, ListItemText } from "@mui/material"
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import {  useDispatch, useSelector, useStore } from 'react-redux';
import { Skeleton, Typography } from '@mui/material';
import { sortWaterwaysSelector } from '../../api/usgs/waterways-slice';
import WaterListItem from './w-list-item';
import { useEffect } from 'react';
import { featureChanged } from '../../store/slices/ui-slice';

export default function WaterwayList() { 
    const dispatch = useDispatch()
    let {loading} = useSelector(s => s.entities.waterways)
    const {featured, autoScroll, scrollTime} = useSelector(s => s.ui)
    const store = useStore().getState()
    const data = sortWaterwaysSelector(store)
    const listWaters = (waterways) => {
        return waterways.map((w) => <WaterListItem key={w.id} waterway={w}/>)
    } 
    const skelton = () => {
        let arr = []
        for(let i = 0; i < 7; i ++){
            arr.push((<Typography variant="h3"  key={i}><Skeleton varient="rectangular" animation="wave"/></Typography>))
        }
        return arr
    }
    useEffect(()=> {
        if(loading === false){
            if(data.length > 0 && data[0].id)
                dispatch(featureChanged(data[0].id))
            }
    }, [loading])

    useEffect(()=>{
        if(loading === false && autoScroll){
            const timer = setTimeout(()=>{
                let index = data.findIndex(w => w.id === featured) 
                if(index === -1) return 
                index++
                if(index >= data.length) dispatch(featureChanged(data[0].id))
                if(index < data.length) dispatch(featureChanged(data[index].id))
            }, scrollTime)
            return () => clearTimeout(timer)
        }
    }, [loading, autoScroll, featured])
    return  (
        <Box  >
            <List>
                {loading ? skelton() : listWaters(data)}
            </List>
        </Box>
    )
}