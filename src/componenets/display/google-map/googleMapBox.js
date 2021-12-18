import {useState, useCallback, useEffect} from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Skeleton } from '@mui/material';


export default function GoogleMapBox({location, style, zoom}) {
  const [ready, setReady] = useState(false)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
  })

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

  const styles = {height: "100%", width: "100%", ...style}
  return ready ? (
      <GoogleMap
        mapContainerStyle={styles}
        center={formatLocation(location)}
        zoom={zoom || 14}
      >
        <Marker position={formatLocation(location)}/>
        </GoogleMap>
  ) : <Skeleton animation="wave" height={"100%"}/> 
}
