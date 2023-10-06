import React, { useEffect, useState, useRef } from 'react'
import { Marker, Popup, NavigationControl ,GeolocateControl} from 'react-map-gl'
import Map from 'react-map-gl';
import '../components/css/map.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import jobs from '../services/jobs';
import {FaMapMarkerAlt} from 'react-icons/fa'
import getCenter from 'geolib/es/getCenter'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MapContent from '../components/MapContent';

const Maps = () => {
  //Define state variables
  const [fullJobs, setFullJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState({})
  const jobData = useSelector((state)=> state.cartJobs.jobData)
  const mapRef = useRef(null)
  
  //finding the currently selected job on the Map
  const item = jobData.find((job)=> job.id === selectedJob.id)
  //Determine if the currently selected job is liked or not
  const heart = item ? true : false

  // Access the router navigation function
  const navigate = useNavigate()

  // Create a unique identifier based on job title
  const id = jobs.title
  const idString = (id)=>{
    return String(id).toLowerCase().split('/').join('')

  }
  const root = idString(id)
  
  
  // Am sending the selected job data, the identified data and the liked to 
  // the single job page so as to maintain the exact state when clicked.
  const handleClick = ()=>{
    navigate(`/jobs/${root}`, 
    {
      state: {
        item: selectedJob, 
        heart: heart
      }
      
    }
    ) 
  }

  
   // Set up initial viewport settings for the map
  const [viewport, setViewport] = useState({
    latitude: 54.2379,
    longitude: -2.369669,
    width: '100%',
    height: '100%',
    zoom: 5
  })

  // Populate fullJobs state with job data from the 'jobs' variable
  useEffect(()=>{
    if(jobs){
      setFullJobs(jobs)
    }
    
  },[])


  // Define the Mapbox token
  const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

  // Render the Map component and its contents
  return (
    <div className='map'>
      <div className='map-container'>
        <Map  mapboxAccessToken={TOKEN} 
          transitionDuration = "200"
          mapStyle="mapbox://styles/wizeeyung/clm292wow00sl01pfcvr8hv77"
          {...viewport} onMove={evt => {setViewport(evt.viewport);}}
           projection='globe'
           ref={mapRef}
        >
        {jobs?.map((job)=> (
          <div key={job.id}>
          <Marker latitude={job.latitude ?? 0} longitude={job.longitude ?? 0} >
            <p>
              <FaMapMarkerAlt  className='marker' onClick={(e)=> {
              e.preventDefault();
              setSelectedJob(job);}}/> 
            </p>

          </Marker>

          
          {selectedJob?.latitude === job?.latitude ? 
        (<div>
        <Popup className='popup' onClose={()=>{
           setSelectedJob({})}} closeOnClick={false} latitude={selectedJob.latitude ?? 0} longitude={selectedJob.longitude ?? 0}>
          <div className='popup-container'  onClick={handleClick}>
            <h1>{selectedJob.title}</h1>
            <p>{selectedJob.company}</p>
          </div>
        </Popup>
        </div>)
        : null}
       
          </div>
        ))
        }
  
        <NavigationControl />
        <GeolocateControl  position='top-left'  trackUserLocation />
        <MapContent setViewport={setViewport} mapRef={mapRef}/>

        </Map>
      </div>
      </div>
  )
}

export default Maps