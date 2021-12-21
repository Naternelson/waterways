import {useState, useCallback, useEffect} from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Box, Paper, Skeleton } from '@mui/material';


export default function GoogleMapBox({location, style, zoom}) {
  let [ready, setReady] = useState(false)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
  })
  // ready = false
  useEffect(()=>{
    if(isLoaded && Object.values(location).length > 0) setReady(true)
    else setReady(false)
  }, [location, isLoaded])

  function formatLocation(location){
    return {
      lat: location.lat || location.latitude,
      lng: location.lng || location.longitude
    }
  }

  const mapOptions = {
    fullscreenControl: false,
    scaleControl: false, 
    mapTypeControl: false,
    rotateControl: false
}
  const styles = {height: "100%", width: "100%", ...style}
  return ready ? (
      <GoogleMap 
        mapContainerStyle={styles}
        center={formatLocation(location)}
        zoom={zoom || 14}
        options={mapOptions}
      >
        <Marker position={formatLocation(location)}/>
        </GoogleMap>
  ) : <Skeleton animation="wave" variant="rectangular" width="100%" height={"100%"}/> 
}
