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


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [singleJob, setJob]= useState([])
  const jobData = useSelector((state)=> state.cartJobs.jobData)

  const items = jobData.find((item)=> item.id === singleJob.id)
  console.log(items, 'found')
  const id = jobs.title
  const idString = (id)=>{
    return String(id).toLowerCase().split('/').join('')

  }
  const root = idString(id)

  // console.log(items)

  

  useEffect(()=>{
    setJob(job)

  },[])
 


  const handleClick = ()=>{
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
            <button>Saved</button>
          </div>
        </div>
        <GiCancel onClick={()=> toast.error(`${job.title} job removed successfully`) & dispatch(removeJobs(job.id))} className='close' />
        
      </div>

      <ToastContainer position='top-left' autoClose={2000}
        hideProgressBar={false} newestOnTop={false} closeOnClick
        rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='dark'
        
      /> 
     

      
    </div>
    
  )
}

export default FavoriteNotEmpty