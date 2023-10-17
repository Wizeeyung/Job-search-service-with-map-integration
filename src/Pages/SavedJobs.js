import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../components/css/savedjob.css'
import FavoriteEmpty from '../components/FavoriteEmpty'
import FavoriteNotEmpty from '../components/FavoriteNotEmpty'
import { clearJobs } from '../Redux/cartJobsSlice'
import { ToastContainer, toast } from 'react-toastify';

const SavedJobs = () => {


  const jobData = useSelector((state)=> state.cartJobs.jobData)
  const dispatch = useDispatch()

  console.log(jobData, 'jobdsta')
  

  


  return (
    <div className='saved-jobs'>
      <div className='img'>
        <img src='https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhpcmluZyUyMGJhbm5lcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' alt='banner' />
      </div>
      
        {jobData.length === 0 ? <FavoriteEmpty /> : jobData.map((job)=>{
          return (
              <FavoriteNotEmpty key={job.id} job={job}/>
          )
        })}

      {jobData.length > 0 ? <div className='clear'>
        <div className='favorite-not-empty-right'>
          <button onClick={()=> toast.error('all jobs removed from favorites') & dispatch(clearJobs())}>Clear All</button>
        </div>
      </div> : null}

      <ToastContainer position='top-left' autoClose={2000}
        hideProgressBar={false} newestOnTop={false} closeOnClick
        rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='dark'
        />  
    </div>
  )
}

export default SavedJobs