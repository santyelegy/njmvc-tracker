import React from 'react'
import { GoogleMap, useJsApiLoader,Marker } from '@react-google-maps/api';


const mapContainerStyle = {
  width: "800px"
}

function MapWrapper(props) {
  function clickMarker(mvc){
    props.setactiveKey(props.MVCToIndex[mvc.id]);
    var element = document.getElementById(mvc.name.split("-")[0]);
    element.scrollIntoView();
  };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAZUmNfcuVyd_kHSsTrRBh0ySprZxraGmQ"
  });
  
  const markers=props.mvcs.map((mvc,index)=>{
    var position={lat:mvc.lat,lng:mvc.long};
    return(
      <Marker key={index} title={mvc.name.split("-")[0]} position={position} onClick={()=>clickMarker(mvc)} value={mvc}/>
    )
  });
  return isLoaded ? (
  <GoogleMap
    mapContainerStyle={mapContainerStyle}
    mapContainerClassName={"mapwrapper"}
    zoom={props.zoom}
    center={props.center}
  >
  {markers}
  </GoogleMap>
  ) : <></>
}

export default MapWrapper