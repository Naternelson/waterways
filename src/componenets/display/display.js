import WaterwayList from '../waterway-list/waterway-list';
import {Grid} from "@mui/material"
import Featured from './featured/featured';
export default function Display(){

    return  (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={7} pr={2} sx={{overflowY: 'auto', maxHeight: '75vh'}}>
                <WaterwayList/>
            </Grid>
            <Grid item xs={12} sm={6} lg={5}>
                <Featured/>
            </Grid>
        </Grid>
        )
}