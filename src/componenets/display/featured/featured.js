import {  Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FeatureCard from "./feature-card/feature-card";
import GoogleMapBox from "./google-map/googleMapBox";

export default function Featured(){
    const featuredId = useSelector((s) => s.ui.featured)
    const waterways = useSelector((s) => s.entities.waterways.data)
    const [location, setLocation] = useState({})
    useEffect(()=>{
        const waterway = waterways[featuredId]
        if(!waterway || !waterway.coord)  {setLocation({})}
        else {setLocation(waterway.coord)}
    }, [featuredId])

    return <Grid container spacing={2} sx={{height: "100%"}}>
        <Grid item sx={{height: "34%", width: "100%"}}>
            <Paper elevation={5} sx={{height: "100%", width: "100%"}}>
                <GoogleMapBox location={location}/>
            </Paper>
        </Grid>
        <Grid item sx={{height: "66%", width: "100%"}}>
            <FeatureCard/>
        </Grid>
        
    </Grid>

}