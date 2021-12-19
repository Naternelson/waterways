import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GoogleMapBox from "./googleMapBox";

export default function Featured(){
    const featuredId = useSelector((s) => s.ui.featured)
    const waterways = useSelector((s) => s.entities.waterways.data)
    const [location, setLocation] = useState({})

    useEffect(()=>{
        const waterway = waterways[featuredId]
        if(!waterway || !waterway.coord)  {setLocation({})}
        else {setLocation(waterway.coord)}
    }, [featuredId])

    return <Box sx={{height:"33%", width: "100%"}}>
            <GoogleMapBox location={location}/>
        </Box>
}