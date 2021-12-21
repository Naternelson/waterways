import { Water } from "@mui/icons-material"
import { Avatar, Box, CardHeader, Grid, Paper } from "@mui/material"

export default function FlowCard({data}){
    const flow = data["00060"]
    let flowValid = true 
    // ====================
    // Check to see if need to skip
    // ====================
    const conditionCheck = () => {
        if(!flow || flow.noData) flowValid = false 
        if(!flow ) return false 
        return true 
    }
    if(!conditionCheck()) return false 
    
    // ====================
    // Set Values based on availability 
    // ====================
    const flowValue = flowValid ? Math.round(Number(flow.value)) : null 
    const title = "Flow Rate"
    const flowDisplay = flowValid ? `${flowValue} ft` : "No Data Available"
    const unit = flowValid ? <><sup>3</sup><span>/sec</span></> : ""
    const subheader = <span>
        {flowDisplay}
        {unit}
    </span>

    // ====================
    // Render
    // ====================
    return (
            <Grid item xs={12} md={6} lg={4} justify={"center"}>
                
                <Paper sx={{width: "100%", height: "100%", display: 'flex', alignItems: 'center'}}>
                        <CardHeader
                            avatar={<Water color={'primary'}/>}
                            title={title}
                            subheader={subheader}
                        />
                </Paper>
        </Grid>
    )
}