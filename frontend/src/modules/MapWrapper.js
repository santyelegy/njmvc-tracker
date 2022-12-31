import React from 'react'
import { GoogleMap, useJsApiLoader,Marker } from '@react-google-maps/api';


const mapContainerStyle = {
  height: "800px",
  width: "800px"
}

function MapWrapper(props) {
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAZUmNfcuVyd_kHSsTrRBh0ySprZxraGmQ"
  })

  const markers=props.mvcs.map((mvc,index)=>{
    var position={lat:mvc.lat,lng:mvc.long}
    const clickMarker=()=>{
      props.setactiveKey(props.MVCToIndex[mvc.id]);
    }
    return(
      <Marker key={index} title={mvc.name} position={position} onClick={clickMarker}/>
    )
  })
  return isLoaded ? (
  <GoogleMap
    mapContainerStyle={mapContainerStyle}
    zoom={props.zoom}
    center={props.center}
  >
  {markers}
  </GoogleMap>
  ) : <></>
}

export default MapWrapper