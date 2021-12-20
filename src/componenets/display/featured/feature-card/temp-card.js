import { Thermostat } from "@mui/icons-material"
import { Avatar, Box, Card, CardContent, CardHeader, Grid } from "@mui/material"
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
    const airValue = airTempValid ? CeltoFahr(Math.round(Number(airTemp.value))) : null 
    const waterValue  = waterTempValid ? CeltoFahr(Math.round(Number(waterTemp.value))) : null 
    let title, subheader;
    if(airTempValid && waterTempValid){
        title = "Temp Water / Air"
        subheader = `${waterValue}${degree}F / ${airValue}${degree}F`
    } else if(airTempValid){
        title = "Temp Air"
        subheader = `${airValue}${degree}F`
    } else {
        title = "Temp Water"
        subheader = `${waterValue}${degree}F`
    }
    // ====================
    // Render
    // ====================
    return (
            <Grid item>
                <Box>
                    <CardContent>
                        <CardHeader
                            avatar={
                                <Avatar>
                                    <Thermostat/>
                                </Avatar>
                            }
                            title={title}
                            subheader={subheader}
                        />
                    </CardContent>
                </Box>
        </Grid>
    )
}