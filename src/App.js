import './App.css';
import { useState } from 'react';
import { Container } from '@mui/material';
import WaterwayList from './componenets/waterway-list/waterway-list';
import { useEffect } from 'react';
// import { locationChanged } from "./api/usgs/waterways-slice"
import {useDispatch, useSelector} from "react-redux"
import {getWaterData} from "./api/usgs/waterways-slice"
import {requestLocation} from "./store/middleware/currentLocation"
import Playground from './playground/playground';

function App() {
  const dispatch = useDispatch()
  const position = useSelector(s => s.entities.waterways.location)
  const available = position.latitude && position.longitude

  useEffect(() =>{
    if(available) dispatch(getWaterData(position))
  }, [position, available, dispatch])


  useEffect(()=> {
    if(!available) dispatch(requestLocation())
  },[available, dispatch])

  return (
    <Playground>
      <WaterwayList/>
    </Playground>
  );
}

export default App;
