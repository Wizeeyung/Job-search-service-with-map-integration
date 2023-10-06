import React, { useEffect, useState } from 'react'
import Jobs from '../services/jobs'


const Load = () => {
  const [jobs, setJobs] = useState([])

  useEffect(()=>{
    setTimeout(()=> setJobs(Jobs), 1000)
  }, [])


  return (
    <div>
      <h1>Job Listings</h1>
      <ul>
        {jobs.map(job => (
          <li key={job.id}>
            <h2>{job.title}</h2>
            <p>{job.skills_required}</p>
            {/* Render other job details */}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Load