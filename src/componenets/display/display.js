import WaterwayList from '../waterway-list/waterway-list';
import {Grid} from "@mui/material"
import Featured from './featured/featured';
export default function Display(){

    return  (
        <Grid container spacing={1}>
            <Grid item order={{xs: 2, sm: 1}} xs={12} sm={6} lg={6} pr={2} sx={{overflowY: 'auto', maxHeight: '75vh'}}>
                <WaterwayList/>
            </Grid>
            <Grid item order={{xs: 1, sm: 2}} xs={12} sm={6} lg={6}>
                <Featured/>
            </Grid>
        </Grid>
        )
}