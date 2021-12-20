import { Thermostat, ThermostatAutoOutlined, ThermostatOutlined, ThermostatRounded } from "@mui/icons-material"
import { Avatar, Box, Card, CardContent, CardHeader, Grid, Paper } from "@mui/material"
import {CeltoFahr} from "temp_converter"

export default function TempCard({data}){
    const airTemp = data["00020"]
    const waterTemp = data["00010"]
    let airTempValid = true 
    let waterTempValid = true 
    // ====================
    // Check to see if need to skip
    // ====================
    const conditionCheck = () => {
        if(!airTemp || airTemp.noData) airTempValid = false 
        if(!waterTemp || waterTemp.noData) waterTempValid = false 
        if(!airTempValid && !waterTempValid) return false 
        return true 
    }
    if(!conditionCheck()) return false 

    // ====================
    // Set Values based on availability 
    // ====================
    const degree = '\u00B0'
    const airValue = airTempValid ? Math.round(CeltoFahr(Number(airTemp.value))) : null 
    const waterValue  = waterTempValid ? Math.round(CeltoFahr(Number(waterTemp.value))) : null 
    let title, subheader;
    if(airTempValid && waterTempValid){
        title = "Water / Air Temp"
        subheader = `${waterValue}${degree}F / ${airValue}${degree}F`
    } else if(airTempValid){
        title = "Air Temp"
        subheader = `${airValue}${degree}F`
    } else {
        title = "Water Temp"
        subheader = `${waterValue}${degree}F`
    }
    // ====================
    // Render
    // ====================
    return (
            <Grid item xs={12} md={6} lg={4}>
                
                <Paper sx={{width: "100%", height: "100%"}}>
                        <CardHeader
                            avatar={<ThermostatOutlined color={"primary"} />}
                            title={title}
                            subheader={subheader}
                        />
                </Paper>
        </Grid>
    )
}