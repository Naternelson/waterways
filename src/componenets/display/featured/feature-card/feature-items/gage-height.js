import { Height } from "@mui/icons-material"
import { CardHeader, Grid, Paper } from "@mui/material"


export default function GageHeightCard({data}){
    const gageHeight = data["00065"]
    let gageValid = true 
    // ====================
    // Check to see if need to skip
    // ====================
    const conditionCheck = () => {
        if(!gageHeight || gageHeight.noData) gageValid = false 
        if(!gageHeight) return false 
        return true 
    }
    if(!conditionCheck()) return false 

    // ====================
    // Set Values based on availability 
    // ====================
    const gageValue = gageValid ? Math.round(Number(gageHeight.value)) : null 

    const title = "Gage Height"
    const subheader = gageValid ? `${gageValue} ft` : "No Data Available"
    // ====================
    // Render
    // ====================
    return (
            <Grid item xs={12} md={6} lg={4}>
                
                <Paper sx={{width: "100%", height: "100%"}}>
                        <CardHeader
                            avatar={<Height color={"primary"} />}
                            title={title}
                            subheader={subheader}
                        />
                </Paper>
        </Grid>
    )
}