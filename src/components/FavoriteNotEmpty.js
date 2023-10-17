import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {FaMoneyCheckAlt} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import jobs from '../services/jobs'
import { toggleLike } from '../Redux/cartJobsSlice'
import {GiCancel} from 'react-icons/gi'
import { removeJobs } from '../Redux/cartJobsSlice'
import { ToastContainer, toast } from 'react-toastify';

const FavoriteNotEmpty = ({job}) => {

  // Get the Redux dispatch function
  const dispatch = useDispatch()
  //Getting the navigation function from the routing library
  const navigate = useNavigate()
  // Initialize a state variable 'singleJob' and its setter function 'setJob'
  const [singleJob, setJob]= useState([])
  // Get job data from the Redux store
  const jobData = useSelector((state)=> state.cartJobs.jobData)


  // Finding a specific job item in 'jobData' based on the 'job.id'
  const items = jobData.find((item)=> item.id === job.id)
  // Extract the job title and assign it to the 'id' variable
  const id = job.title
  // Define a function 'idString' to process the 'id'
  const idString = (id)=>{
    return String(id).toLowerCase().split('/').join('')
  }
  // Create a 'root' variable by calling 'idString' with 'id'
  const root = idString(id)


  // Set up a useEffect to load jobs when the page first loads
  useEffect(()=>{
    setJob(jobs)

  },[])
 
  // Define a function 'handleClick' for handling click events and for passing states by using navigate
  const handleClick = ()=>{
     // Navigate to a specific route (related to 'root') and pass data in the route's state
    navigate(`/jobs/${root}`, 
    {
      state: {
        item: items,
        heart: true   
      } 
    }
    ) 
  }
  

  return (
    <div className='favorite-not-empty'>
      <div className='favorite-not-empty-container' >
        <div className='favorite-not-empty-left'>
          <h1 onClick={()=> handleClick()}>{job.title}</h1>
          <p>{job.company}</p>
          <p>{job.title}</p>
          <p className='align'><FaMoneyCheckAlt className='icon-space'/> {job.salary}</p>

          <div className='favorite-not-empty-right'>
            <button className='saved'>Saved</button>
          </div>
        </div>
        <div className='close-btn'>
        <GiCancel onClick={()=> toast.error(`${job.title} job removed successfully`) & dispatch(removeJobs(job.id))} className='close' />
        </div>
      </div>

      <ToastContainer position='top-left' autoClose={2000}
        hideProgressBar={false} newestOnTop={false} closeOnClick
        rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='dark'
        
      /> 
     

      
    </div>
    
  )
}

export default FavoriteNotEmpty