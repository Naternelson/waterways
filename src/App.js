import './App.css';

import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import {getWaterData} from "./api/usgs/waterways-slice"
import {requestLocation} from "./store/middleware/currentLocation"
import Playground from './playground/playground';

import Display from './componenets/display/display';

function App() {
  const dispatch = useDispatch()
  const {location} = useSelector(s => s.entities.waterways)
  const {latitude, longitude} = location
  const available = latitude && longitude


  useEffect(() =>{
    if(available) dispatch(getWaterData({...location,radius: 50}))
  }, [location, available, dispatch])



  useEffect(()=> {
    if(!available) dispatch(requestLocation())
  },[available, dispatch])

  return (
    <Playground>
      <Display/>
    </Playground>
  );
}

export default App;
