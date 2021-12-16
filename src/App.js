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
  const {location} = useSelector(s => s.entities.waterways)
  const {latitude, longitude} = location
  const available = latitude && longitude
  const url = "https://www.google.com/maps/embed/v1/view?"
  const key = process.env.REACT_APP_GOOGLE_MAPS_KEY
  function generateUrl(base, params){
    const paramArr = []
    for(let key in params){
      paramArr.push(`${key}=${params[key]}`)
    }
    return base + paramArr.join("&")
  }

  useEffect(() =>{
    if(available) dispatch(getWaterData({...location,radius: 50}))
  }, [location, available, dispatch])

  useEffect(()=>{
    if(available) setAddress(
      generateUrl(
        url, {
          key, 
          zoom: 14, 
          center: [latitude, longitude].join(",")
        }
      )
    )
  }, [available, url, key, latitude, longitude])

  useEffect(()=> {
    if(!available) dispatch(requestLocation())
  },[available, dispatch])
  

  return (
    <Playground>
      <Display fullAddress={fullAddress} available={available}/>
      {/* <PlaygroundChild/> */}
    </Playground>
  );
}

export default App;
