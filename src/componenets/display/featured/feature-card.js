import { Box, Card, CardHeader, Collapse, Fade, Grow, Skeleton, Slide, Zoom } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function FeatureCard(){
    const [transitionIn, setTransition] = useState(true)
    const [name, setName] = useState("")
    const {data} = useSelector(s => s.entities.waterways)
    const id = useSelector(s => s.ui.featured)
    const transitionTime = 300
    let waterway = data[id]
    useEffect(()=>{
        if(waterway) {
            setTransition(false)
            setTimeout(()=>{
                setTransition(true)
                setName(waterway.name)
            },transitionTime)
        }
    }, [id])


    const render = () => (
        <Card sx={{height: "100%", width: "100%"}}>
            <Fade in={transitionIn} timeout={transitionTime} sx={{height: "100%"}}>
                <CardHeader title={name}/>
            </Fade>
        </Card>
    )
    return waterway ? render() : <Skeleton height={"100%"} width={"100%"} variant={"rectangular"}/>
}