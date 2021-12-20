import { Box, Card, CardContent, CardHeader, Collapse, Divider, Fade, Grow, Skeleton, Slide, Zoom } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import FeatureItems from "./feature-items"

export default function FeatureCard(){
    const [transitionIn, setTransition] = useState(true)
    const [waterway, setWaterway] = useState({})

    const {data} = useSelector(s => s.entities.waterways)
    const id = useSelector(s => s.ui.featured)

    // ====================
    // Smooth Transition Inbetween Locations
    // ====================
    const transitionTime = 300
    useEffect(()=>{
        if(data[id]) {
            setTransition(false)
            setTimeout(()=>{
                setTransition(true)
                setWaterway(data[id])
            },transitionTime)
        }
    }, [id])


    // ====================
    // Render
    // ====================
    const render = (ready=false) => {
        return (
        <Card elevation={5} sx={{height: "100%", width: "100%"}}>
            {ready ? 
            <Fade in={transitionIn} timeout={transitionTime} sx={{height: "100%"}}>
                <CardContent>
                    <CardHeader title={waterway.name}/>
                    <Divider variant="middle"/>
                    <FeatureItems data={waterway.data}/>
                </CardContent>
                
            </Fade> : <Skeleton height={"100%"} width={"100%"} variant={"rectangular"}/>
            }
        </Card>
    )}
    return render(!!data[id])
}