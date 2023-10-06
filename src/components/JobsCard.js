import React, { useEffect, useState } from 'react'
import {ImLocation} from 'react-icons/im'
import {FaMoneyCheckAlt} from 'react-icons/fa'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import {FaPeopleArrows} from 'react-icons/fa'
import Jobs from '../services/jobs'
import { addToFavorites, toggleLike } from '../Redux/cartJobsSlice'
import './css/job.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';


const JobsCard = ({jobs}) => {

  

  const jobData = useSelector((state)=> state.cartJobs.jobData)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // finding the JobData from Redux from the whole jobs and if it finds set liked to true else false
  const items = jobData.find((job)=> job.id === jobs.id)
  const liked = items ? true : false;
  console.log(liked)
 

// Handling notifications
  const handleNotification = ()=>{
    if(!liked){
      toast.success(`${jobs.title} is added to favorites`)
    } else{
      toast.error(`${jobs.title} removed from favorites`)
    }

    dispatch(addToFavorites({
      id: jobs.id,
      title: jobs.title,
      company: jobs.company,
      salary: jobs.salary_range,
      contract: jobs.type,
      location: jobs.location,
    }))
  }

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('addFavorites')) || [];
    dispatch(addToFavorites(storedFavorites));
  }, []);

  

  const id = jobs.title
  const idString = (id)=>{
    return String(id).toLowerCase().split('/').join('')

  }
  const root = idString(id)
  
  
  

  // Am sending the whole job data, the founded data and the liked to the single job page
  const handleClick = ()=>{
    navigate(`/jobs/${root}`, 
    {
      state: {
        item: jobs, 
        liked: items,
        heart: liked,
      }
      
    }
    ) 
  }

  

  
  
  

  return (
      <>
      <div className='jobs-container'>
        <h2  onClick={handleClick}>{jobs.title}</h2>
        <p>{jobs.company}</p>
        <p><ImLocation className='icon' />{jobs.location}</p>
        <span><FaMoneyCheckAlt className='icon' />{jobs.salary_range}</span>
        <p><FaPeopleArrows className='icon'/>{jobs.type}</p>
        <p>{jobs.description}</p>
        <p onClick={()=>handleNotification() }>{liked ? <AiFillHeart className='icon liked'/> : <AiOutlineHeart className='icon liked'/>} {liked ? 'Remove from favorites' : 'Add to favorites'}</p>
      </div>

      <ToastContainer position='top-left' autoClose={2000}
        hideProgressBar={false} newestOnTop={false} closeOnClick
        rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='dark'
        /> 
      </>


    
  )
}

export default JobsCard