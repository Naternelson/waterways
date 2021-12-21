import { Box, Grid, Typography } from "@mui/material";
import {useState} from "react"
import FlowCard from "./flow-card";
import GageHeightCard from "./gage-height";
import OxygenCard from "./oxygen-card";
import PHCard from "./ph-card";
import RainCard from "./rain-card";
import TempCard from "./temp-card";

export default function FeatureItems(props){
    if(!props.data) return ""
    const data = props.data 
    const cards = {
        temp: {
            codes: ["00020", "00010"],
            card: () => <TempCard data={data}/>
        },
        flow: {
            codes: ["00060"],
            card: () => <FlowCard data={data}/>
        },
        gage: {
            codes: ["00065"],
            card: () => <GageHeightCard data={data}/>
        },
        rain: {
            codes: ["00045"],
            card: () => <RainCard data={data}/>
        }, 
        oxygen: {
            codes: ["00300"],
            card: () =>  <OxygenCard data={data}/>
        },
        ph: {
            codes: ["00400"],
            card: () => <PHCard data={data}/>
        }
    }

    function checkValue(type){
        const obj = cards[type]
        if(!obj) return false 
        if(obj.codes.every(code => !data[code] )) return false 
        return true 
    }
    function checkAllValues(){
        return Object.keys(cards).some(key => checkValue(key))
    }
    return (
        !checkAllValues() ? (
            <Box sx={{display: 'flex', alignItems:"center", justifyContent:"center", height: "100%"}}> 
                <Typography align={'center'} variant="subtitle1"> No Data Available </Typography> 
            </Box>) : 
        <Grid container spacing={2}>
            {checkValue("temp") ? cards.temp.card() : ""}
            {checkValue("flow") ? cards.flow.card() : ""}
            {checkValue("gage") ? cards.gage.card() : ""}
            {checkValue("rain") ? cards.rain.card() : ""}
            {checkValue("oxygen") ? cards.oxygen.card() : ""}
            {checkValue("ph") ? cards.ph.card() : ""}
        </Grid>
    )
}