import { Grid } from "@mui/material";
import FlowCard from "./cards/flow-card";
import TempCard from "./cards/temp-card";

export default function FeatureItems(props){
    if(!props.data) return ""
    const data = props.data 
    const tempCard = <TempCard data={data}/>
    const flowCard = <FlowCard data={data}/>
    return (
        <Grid container spacing={2}>
            {tempCard ? tempCard : ""}
            {flowCard ? flowCard : ""}
            {tempCard ? tempCard : ""}
            {tempCard ? tempCard : ""}
            {tempCard ? tempCard : ""}
            {tempCard ? tempCard : ""}
        </Grid>
    )
}