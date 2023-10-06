import React from 'react'
import JobsCard from './JobsCard'
import './css/job.css'

const Jobs = ({jobs}) => {
  
  return (
    <div className='jobs'>
      <h1>Featured Jobs</h1>
      <div className='job'>
        {jobs.map((job)=>  <JobsCard jobs={job} key={job.id} />)}
      </div>

    </div>
  )
}

export default Jobs