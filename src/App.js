import './App.css';

import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import {getWaterData} from "./api/usgs/waterways-slice"
import {requestLocation} from "./store/middleware/currentLocation"
import Playground from './playground/playground';
import darkScrollbar from '@mui/material/darkScrollbar';

import Display from './componenets/display/display';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { changeBackgroundTheme, changeMode } from './store/slices/ui-slice';

function App() {
  const dispatch = useDispatch()
  dispatch(changeMode('dark'))
  dispatch(changeBackgroundTheme('fishing'))
  const mode = useSelector(s => s.ui.mode)
  const {location, data} = useSelector(s => s.entities.waterways)
  const {latitude, longitude} = location
  const available = latitude && longitude
  const theme = createTheme({
    typography: {
      fontSize: 16
    },
    palette: {mode}
  })


  useEffect(() =>{
    if(available) dispatch(getWaterData({...location,radius: 50}))
  }, [location, available, dispatch])



  useEffect(()=> {
    if(!available) dispatch(requestLocation())
  },[available, dispatch])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Playground>
        <Display/>
      </Playground>
    </ThemeProvider>
  );
}

export default App;
