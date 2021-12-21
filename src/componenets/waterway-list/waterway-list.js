// import { List, Skeleton, ListItem, ListItemText } from "@mui/material"
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import {  useDispatch, useSelector, useStore } from 'react-redux';
import { Input, InputAdornment, Paper, Skeleton, Typography } from '@mui/material';
import { sortWaterwaysSelector } from '../../api/usgs/waterways-slice';
import WaterListItem from './w-list-item';
import { useEffect } from 'react';
import { changeRadius, featureChanged } from '../../store/slices/ui-slice';


export default function WaterwayList() { 
    const dispatch = useDispatch()
    
    let {loading} = useSelector(s => s.entities.waterways)
    const {featured, autoScroll, scrollTime, searchRadius, maxRadius} = useSelector(s => s.ui)
    const store = useStore().getState()
    const data = sortWaterwaysSelector(store, true, searchRadius)
    const listWaters = (waterways) => {
        return waterways.map((w) => <WaterListItem key={w.id} waterway={w}/>)
    } 
    // ====================
    // Create List of Skeleton Objects 
    // ====================
    const skelton = (iterations) => {
        let arr = []
        for(let i = 0; i < iterations; i ++){
            arr.push((<Typography variant="h3"  key={i}><Skeleton varient="rectangular" animation="wave"/></Typography>))
        }
        return arr
    }
    // ====================
    // Set the first value to focus
    // ====================
    useEffect(()=> {
        if(loading === false && !featured){
            if(data.length > 0 && data[0].id){
                dispatch(featureChanged(data[0].id))
            }
        }
    }, [loading, dispatch, data, featured])

    // ====================
    // Auto Scroll Through List
    // ====================
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
    }, [loading, autoScroll, scrollTime, data, dispatch, featured])
    
    // ====================
    // Callback
    // ====================
    function changeHandler(e){
        const val = e.target.value
        if(val <= maxRadius && val >= 5) {
            dispatch(changeRadius(val))
            if(!loading && data[0].id !== featured) dispatch(featureChanged(data[0].id))
        }
    }
    return  (<>
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxHeight: '100%'}}>
        <Paper sx={{ display: 'flex',  py:5, mb: 1, mr:1, textAlign: 'center', alignItems:"center", justifyContent: 'center'}}>
            <Box>
                <Typography sx={{p: 0}}variant='h2'>Angler's Den</Typography>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', px: 5, pt: 2}}>
                    <Typography variant='subtitle2'>Local Waterways</Typography>
                    <Box>
                        <Input disableUnderline sx={{
                            width:"100px",
                            "& .MuiInput-input": {textAlign: 'center', p:0}
                            }} type={'number'}
                            variant= 'standard'
                            endAdornment={<InputAdornment position="end">miles</InputAdornment>}
                            value={searchRadius}
                            onChange={changeHandler}
                            />
                    </Box>
        
                </Box>
            </Box>
        </Paper>
        <Box  sx={{overflow: 'auto', pr: 1}}>
            <List>
                {loading ? skelton(5) : listWaters(data)}
            </List>
        </Box>
    </Box>
    </>

    )
}