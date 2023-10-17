import React, {useState, useEffect} from 'react'
import GoogleMapReact from 'google-map-react'
import './css/map.css'
import {AiOutlineSearch, AiOutlineClose} from 'react-icons/ai'

const MapContent = ({setViewport, mapRef}) => {

  const [places, setPlaces] = useState([])
  const [input, setInput] = useState('')
  const [active, setActive] = useState(false)


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getPlaces();
    }, 300);

    return () => clearTimeout(timeoutId); // Clear the timeout on unmount
  }, [input]);


  // useEffect(()=>{
  //   getPlaces()
  // }, [input])

  const getPlaces = async ()=>{
    const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
    const data = await res.json()
    console.log(data, 'searchdata')
    setPlaces(data.features)
  }

  const handleClick = (place) =>{
    const slicedPlaceName = place.place_name.slice(0, 30);
    const truncatedPlaceName = place.place_name.length > 30 ? `${slicedPlaceName}...` : slicedPlaceName;
    
    setViewport((prevViewport)=>({
      ...prevViewport, latitude: place.geometry.coordinates[1],
      longitude: place.geometry.coordinates[0], zoom: 12, transitionDuration: 1000
    }))

    // Access the map instance using the ref
  const map = mapRef.current.getMap();

  const targetCenter = [place.geometry.coordinates[0], place.geometry.coordinates[1]];
  const targetZoom = 12;

  const initialZoom = map.getZoom();
  const zoomStep = (targetZoom - initialZoom) / 100; // Adjust the number of steps as needed
  let currentZoom = initialZoom;

  const zoomInInterval = setInterval(() => {
    if (currentZoom >= targetZoom) {
      clearInterval(zoomInInterval);
    } else {
      currentZoom += zoomStep;
      map.setZoom(currentZoom);
    }
  }, 10); //
    
    setInput(truncatedPlaceName)
    setActive(true)
  }


  return (
    <div className='map-search'>
      <div className='map-search-container'>
        <div className='map-search-icons'>
          <span><AiOutlineSearch /></span>
          <span className='map-search-close'><AiOutlineClose onClick={()=> setInput('')}/></span>

        </div>
        <div className='text_cut'>
          <input type='text' list='places-list' name='places' value={input} onChange={(e)=> (setInput(e.target.value) & setActive(false)) } placeholder='jobs near you' />
        </div>
      </div>
      {!active ?
      <div className='places'>
      {places?.map((place)=>{
        return (
          <div key={place.id} className='places-container' onClick={()=> handleClick(place)}>
            <h4 className='text_cut'>{place.text}</h4>
            <h5 className='text_cut'>{place.place_name}</h5>
          </div>
        )
      })}
      </div> : null }

    </div>
  )
}

export default MapContent