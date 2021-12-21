import './App.css';

import { useEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import {getWaterData} from "./api/usgs/waterways-slice"
import {requestLocation} from "./store/middleware/currentLocation"
import Playground from './playground/playground';

import Display from './componenets/display/display';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { changeBackgroundTheme, changeMode } from './store/slices/ui-slice';

function App() {
  const dispatch = useDispatch()
  const timer = useRef()
  dispatch(changeMode('dark'))
  dispatch(changeBackgroundTheme('fishing'))
  const {mode, maxRadius, updateUnit, updateRate} = useSelector(s => s.ui)
  const {location} = useSelector(s => s.entities.waterways)
  const {latitude, longitude} = location
  const available = latitude && longitude
  const theme = createTheme({
    typography: {
      fontSize: 16
    },
    palette: {mode}
  })

  // ====================
  // Recall the API every so often 
  // ====================
  const refreshRate = updateUnit === "minute" ? (updateRate * 60 * 1000) : (60 * 60 * 1000)
  useEffect(() =>{
    if(timer) clearInterval(timer.current)
    if(available) {
        dispatch(getWaterData({...location, radius: maxRadius}))
        timer.current = setInterval(()=>{
          dispatch(getWaterData({...location, radius: maxRadius}))
        }, refreshRate)
      }
    
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
