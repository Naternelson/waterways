import { Box, Card, CardContent, CardHeader, Collapse, Divider, Fade, Grow, Skeleton, Slide, Zoom } from "@mui/material"
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


    const render = (ready=false) => (
        <Card elevation={5} sx={{height: "100%", width: "100%"}}>
            {ready ? 
            <Fade in={transitionIn} timeout={transitionTime} sx={{height: "100%"}}>
                <CardContent>
                    <CardHeader title={name}/>
                    <Divider variant="middle"/>
                </CardContent>
                
            </Fade> : <Skeleton height={"100%"} width={"100%"} variant={"rectangular"}/>
            }
        </Card>
    )
    return render(waterway)
}