import './App.css';

import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import {getWaterData} from "./api/usgs/waterways-slice"
import {requestLocation} from "./store/middleware/currentLocation"
import Playground from './playground/playground';

import Display from './componenets/display/display';
import PlaygroundChild from './playground/playground-child-test';

function App() {
  const dispatch = useDispatch()
  const [fullAddress, setAddress] = useState("")
  const [second, setSecond] = useState(true)
  const {location} = useSelector(s => s.entities.waterways)
  const {latitude, longitude} = location
  const available = latitude && longitude


  useEffect(() =>{
    if(available) dispatch(getWaterData({...location,radius: 50}))
  }, [location, available, dispatch])



  useEffect(()=> {
    if(!available) dispatch(requestLocation())
  },[available, dispatch])
  
  // useEffect(()=>{
  //   if(second) setTimeout(()=> setSecond(false), 2000)
  // })

  return (
    <Playground>
      <Display fullAddress={fullAddress} available={available}/>
      {/* <PlaygroundChild ver={1}/> */}
      {/* { second && <PlaygroundChild ver={2}/>} */}
    </Playground>
  );
}

export default App;
