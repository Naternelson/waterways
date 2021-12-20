import { Grid } from "@mui/material";
import TempCard from "./temp-card";

export default function FeatureItems({data}){
    const tempCard = <TempCard data={data}/>
    return (
        <Grid container >
            {tempCard ? tempCard : ""}
        </Grid>
    )
}