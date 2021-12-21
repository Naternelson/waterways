import { Box, ListItemButton, ListItemText, Paper } from "@mui/material"
import { featureChanged } from '../../store/slices/ui-slice';
import converter from "conversions"
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef } from 'react'

export default function WaterListItem({waterway}){
    // ====================
    // Hooks and Variables
    // ====================
    const dispatch = useDispatch()
    const itemRef = useRef(null)
    const featureId = useSelector(s => s.ui.featured)
    const {id, name, distance} = waterway 

    // ====================
    // Helper Functions
    // ====================
    const changeFeatured = () => dispatch(featureChanged(id))
    const distanceDisplay = Math.round(converter(distance, "metres", "miles") * 10) / 10
    const scrollWhenFeatured = useCallback((featureId) => {
        if(featureId === id ) {
            try {itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            catch(err){
                console.error(err)
            }
        }
    }, [itemRef, id])
    
    // ====================
    // Effects
    // ====================
    useEffect(()=>{
        scrollWhenFeatured(featureId)
    }, [featureId, scrollWhenFeatured])

    useEffect(()=>{
        if(featureId === id){
            window.addEventListener('resize',()=>{
                scrollWhenFeatured(featureId)
            })
        }
    }, [featureId, scrollWhenFeatured, id])

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