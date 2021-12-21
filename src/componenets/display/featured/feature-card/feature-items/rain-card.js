import { Cloud } from "@mui/icons-material"
import { CardHeader, Grid, Paper } from "@mui/material"


export default function RainCard({data}){
    const rainHeight = data["00045"]
    let rainValid = true 
    // ====================
    // Check to see if need to skip
    // ====================
    const conditionCheck = () => {
        if(!rainHeight || rainHeight.noData) rainValid = false 
        if(!rainHeight) return false 
        return true 
    }
    if(!conditionCheck()) return false 

    // ====================
    // Set Values based on availability 
    // ====================
    const rainValue = rainValid ? Math.round(Number(rainHeight.value)) : null 

    const title = "Rainfall"
    const subheader = rainValid ? `${rainValue} in` : "No Data Available"
    // ====================
    // Render
    // ====================
    return (
            <Grid item xs={12} md={6} lg={4}>
                
                <Paper sx={{width: "100%", height: "100%"}}>
                        <CardHeader
                            avatar={<Cloud color={"primary"} />}
                            title={title}
                            subheader={subheader}
                        />
                </Paper>
        </Grid>
    )
}