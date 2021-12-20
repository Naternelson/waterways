import { Grid } from "@mui/material"
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

    const airValue = CeltoFahr(Number(airTemp.value))
    const waterValue  = CeltoFahr(Number(waterTemp.value))
    if(airTempValid && waterTempValid){
        // ====================
        // Has both Air and Water Temperature values
        // ====================

        return <Grid item>
            <Card>
                
            </Card>
        </Grid>
    } else if(airTempValid){
        // ====================
        // Has only Air Temperature Data 
        // ====================
    } else {
        // ====================
        // Hase Only Water Temperature Data 
        // ====================
    }

}