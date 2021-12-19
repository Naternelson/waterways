import { Box, ListItemButton, ListItemText, Paper } from "@mui/material"
import { featureChanged } from '../../store/slices/ui-slice';
import converter from "conversions"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from 'react'

export default function WaterListItem({waterway}){
    const dispatch = useDispatch()
    const itemRef = useRef(null)
    const featureId = useSelector(s => s.ui.featured)
    const {id, name, distance} = waterway 
    const changeFeatured = () => dispatch(featureChanged(id))
    
    const distanceDisplay = Math.round(converter(distance, "metres", "miles") * 10) / 10

    useEffect(()=>{
        if(featureId === id ) itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [featureId])

    return (
        <Box sx={{py: 1}} ref={itemRef}>
            <Paper elevation={3} >
                <ListItemButton selected={featureId === id}>
                    <ListItemText onClick={changeFeatured} onFocus={changeFeatured} primary={name} secondary={`${distanceDisplay} miles`}/>
                </ListItemButton>
            </Paper>
        </Box>
    )
}