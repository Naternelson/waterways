import { Box, Card, CardContent, CardHeader, Collapse, Divider, Fade, Grow, Skeleton, Slide, Typography, Zoom } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import FeatureItems from "./feature-items/feature-items"

export default function FeatureCard(){
    const [transitionIn, setTransition] = useState(true)
    const [waterway, setWaterway] = useState({})

    const {data} = useSelector(s => s.entities.waterways)
    const id = useSelector(s => s.ui.featured)

    const dateTime = new Date(waterway.lastUpdatedOn)
    const fullDateTimeString = `${dateTime.toLocaleTimeString()} ${dateTime.toLocaleDateString()}`
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
                    <CardHeader title={waterway.name} sx={{py: 1}}/>
                    <Box sx={{mx: 6, my: 0}}>
                        <Typography variant={'subtitle2'}>State: <Typography variant={'subtitle1'} component={'span'}>{waterway.state}</Typography></Typography>
                        <Typography variant={'subtitle2'}>Last Updated On: <Typography variant={'subtitle1'} component={'span'}>{fullDateTimeString}</Typography></Typography>
                    </Box>

                    <Divider variant="middle" sx={{mb:2}}/>
                    <FeatureItems data={waterway.data}/>
                </CardContent>
                
            </Fade> : <Skeleton animation={"wave"} height={"100%"} width={"100%"} variant={"rectangular"}/>
            }
        </Card>
    )}
    return render(!!data[id])
}