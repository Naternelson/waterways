import { Grid } from "@mui/material";
import TempCard from "./temp-card";

export default function FeatureItems(props){
    if(!props.data) return ""
    const data = props.data 
    const tempCard = <TempCard data={data}/>
    return (
        <Grid container spacing={2}>
            {tempCard ? tempCard : ""}
            {tempCard ? tempCard : ""}
            {tempCard ? tempCard : ""}
            {tempCard ? tempCard : ""}
            {tempCard ? tempCard : ""}
            {tempCard ? tempCard : ""}
        </Grid>
    )
}