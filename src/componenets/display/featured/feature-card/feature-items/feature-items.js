import { Grid } from "@mui/material";
import FlowCard from "./flow-card";
import GageHeightCard from "./gage-height";
import RainCard from "./rain-card";
import TempCard from "./temp-card";

export default function FeatureItems(props){
    if(!props.data) return ""
    const data = props.data 
    const tempCard = <TempCard data={data}/>
    const flowCard = <FlowCard data={data}/>
    const gageHeight = <GageHeightCard data={data}/>
    const rainCard = <RainCard data={data}/>
    return (
        <Grid container spacing={2}>
            {tempCard ? tempCard : ""}
            {flowCard ? flowCard : ""}
            {gageHeight ? gageHeight : ""}
            {rainCard ? rainCard : ""}
            {tempCard ? tempCard : ""}
            {tempCard ? tempCard : ""}
        </Grid>
    )
}