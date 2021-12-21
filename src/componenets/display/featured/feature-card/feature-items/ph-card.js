import { Grain, ViewModule } from "@mui/icons-material"
import { CardHeader, Grid, Paper } from "@mui/material"

export default function PHCard({data}){
    const ph = data["00400"]
    let valid = true 
    // ====================
    // Check to see if need to skip
    // ====================
    const conditionCheck = () => {
        if(!ph || ph.noData) valid = false 
        if(!ph ) return false 
        return true 
    }
    if(!conditionCheck()) return false 
    // ====================
    // Set Values based on availability 
    // ====================
    const phValue = valid ? Number(ph.value) : null 
    const title = "Water PH"
    const subheader = valid ? `${phValue}` : "No Data Available"

    // ====================
    // Render
    // ====================
    return (
            <Grid item xs={12} md={6} lg={4} justify={"center"}>
                
                <Paper sx={{width: "100%", height: "100%", display: 'flex', alignItems: 'center'}}>
                    <CardHeader
                        avatar={<ViewModule color={'primary'}/>}
                        title={title}
                        subheader={subheader}
                    />
                </Paper>
        </Grid>
    )
}