import WaterwayList from '../waterway-list/waterway-list';
import {Grid} from "@mui/material"
import Featured from './featured/featured';
export default function Display(){

    return  (
        <Grid container spacing={1} height={"100%"} >
            <Grid item order={{xs: 2, sm: 1}} xs={12} sm={6} lg={6} p={1} sx={{overflowY: 'hidden', maxHeight: '80vh'}}>
                <WaterwayList/>
            </Grid>
            <Grid item order={{xs: 1, sm: 2}} xs={12} sm={6} lg={6} p={0} sx={{overflow: 'hidden', height: '80vh',maxHeight: '80vh'}}>
                <Featured/>
            </Grid>
        </Grid>
        )
}