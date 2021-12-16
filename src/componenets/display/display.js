import WaterwayList from '../waterway-list/waterway-list';
import { Box } from '@mui/system';
import {Grid, Row} from "@mui/material"
export default function Display({fullAddress, available}){
    return  (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={8} >
            <WaterwayList/>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
            <Box>
                {
                available ? 
                    <iframe title="google-map" width="100%" style={{"border":"0"}} loading="lazy" src={fullAddress}></iframe> :
                    ""
                }
            </Box>
            </Grid>
        </Grid>
        )
}