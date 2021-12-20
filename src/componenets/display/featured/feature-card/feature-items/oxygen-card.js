import { Grain, Water } from "@mui/icons-material"
import { Avatar, Box, CardHeader, Grid, Paper } from "@mui/material"

export default function OxygenCard({data}){
    const oxygen = data["00300"]
    let valid = true 
    // ====================
    // Check to see if need to skip
    // ====================
    const conditionCheck = () => {
        if(!oxygen || oxygen.noData) valid = false 
        if(!valid ) return false 
        return true 
    }
    if(!conditionCheck()) return false 
    console.log({data})
    // ====================
    // Set Values based on availability 
    // ====================
    const oxygenValue = valid ? Math.round(Number(oxygen.value)) : null 
    const title = "Dissolved Oxygen"
    const subheader = `${oxygenValue} mg/L`

    // ====================
    // Render
    // ====================
    return (
            <Grid item xs={12} md={6} lg={4} justify={"center"}>
                
                <Paper sx={{width: "100%", height: "100%", display: 'flex', alignItems: 'center'}}>
                        <CardHeader
                            avatar={<Grain color={'primary'}/>}
                            title={title}
                            subheader={subheader}
                        />
                </Paper>
        </Grid>
    )
}