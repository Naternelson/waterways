import { Box, Card,  CardHeader,  Divider, Fade,  Skeleton,  Typography} from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import isToday, { isYesterday } from "../../../../utility/isToday"
import FeatureItems from "./feature-items/feature-items"

export default function FeatureCard(){
    const [transitionIn, setTransition] = useState(true)
    const [waterway, setWaterway] = useState({})

    const {data} = useSelector(s => s.entities.waterways)
    const id = useSelector(s => s.ui.featured)

    const dateTime = new Date(waterway.lastUpdatedOn)
    const time = dateTime.toLocaleTimeString([], {timeStyle: 'short'})
    const fullTime = isToday(dateTime) ? 
        time :
        isYesterday(dateTime) ? `Yesterday ${time}` :
        `${dateTime.toLocaleDateString()} ${time}`

    // const fullDateTimeString = `${dateTime.toLocaleTimeString([], {timeStyle: 'short'})} ${dateTime.toLocaleDateString()}`
    // ====================
    // Smooth Transition Inbetween Locations
    // ====================
    const transitionTime = 100
    useEffect(()=>{
        if(data[id]) {
            setTransition(false)
            setTimeout(()=>{
                setTransition(true)
                setWaterway(data[id])
            },transitionTime)
        }
    }, [id, data])


    // ====================
    // Render
    // ====================
    const render = (ready=false) => {
        return (
        <Card elevation={5} sx={{height: "100%", width: "100%", mt: 1}}>
            {ready ? 
            <Fade in={transitionIn} timeout={transitionTime}>
                <Box sx={{display: 'flex', flexFlow: 'column', height: "100%", p: 2}}>
                    <CardHeader title={waterway.name} sx={{py: 1}}/>
                    <Box sx={{mx: 6, my: 0}}>
                        <Typography variant={'subtitle2'}>State: <Typography variant={'subtitle1'} component={'span'}>{waterway.state}</Typography></Typography>
                        <Typography variant={'subtitle2'}>Last Updated: <Typography variant={'subtitle1'} component={'span'}>{fullTime}</Typography></Typography>
                    </Box>

                    <Divider variant="middle" />
                    <Box sx={{mx: 2, my: 1 , flexBasis: 'auto', height: "100%"}}>
                        <FeatureItems data={waterway.data}/>
                    </Box>
                </Box>
                
            </Fade> : <Skeleton animation={"wave"} height={"100%"} width={"100%"} variant={"rectangular"}/>
            }
        </Card>
    )}
    return render(!!data[id])
}