import React from 'react'
import { useState, useEffect } from 'react'
import Search from '../components/Search'
import Jobs from '../components/Jobs'
import jobs from '../services/jobs'
import Pagination from '../components/Pagination'

// Define a functional component named 'Jobpage'.
const Jobpage = () => {

  // Declare a state variable for all useState hooks.
  const [search, setSearch] = useState(false)
  const [jobData, setJobs] = useState([])
  const [locationInput, setLocationInput] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(12);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage
  const currentPosts = jobData.slice(firstPostIndex,lastPostIndex)

  const [titleInput, setTitleInput] = useState('')
  const [filteredJobs, setFilteredJobs] = useState([])




  const handleTitleInput = (e) =>{
    setTitleInput(e.target.value.toLowerCase())

    const filteredItems = jobData.filter((job)=> job.title.toLowerCase().includes(titleInput) || 
    job.position.toLowerCase().includes(titleInput));

    setFilteredJobs(filteredItems)

    if(titleInput.length > 1){
      setSearch(true)
    } else{
      setSearch(false)
    }
    
  }

  const handleLocationInput = (e)=>{
    setLocationInput(e.target.value.toLowerCase())

    const filteredItems = jobData.filter((job)=> job.location.toLowerCase().includes(locationInput))

    setFilteredJobs(filteredItems)

    if(locationInput.length > 1){
      setSearch(true)
    } else{
      setSearch(false)
    }

  }


  const handleFiltering = (e, selectedFilter, cartItem)=>{
    e.preventDefault()
    
    if (selectedFilter === 'location'){
      const filtered = cartItem === 'All' ? jobData : jobData.filter((job)=> job.location === cartItem );
      setSearch(true)
      setFilteredJobs(filtered)
    } else if (selectedFilter === 'salarie'){
      const salaryfiltered = cartItem === 'All' ? jobData : jobData.filter((job)=> job.salary_range === cartItem)
      setSearch(true)
      setFilteredJobs(salaryfiltered)
    } else if(selectedFilter === 'type'){
      const typefiltered = cartItem === 'All' ? jobData : jobData.filter((job)=> job.type === cartItem)
      setSearch(true)
      setFilteredJobs(typefiltered)
    }
     else{
      setFilteredJobs(jobData)
    }
  }
  

  const handleSubmit = (e)=>{
   
    e.preventDefault()
    const filteredItems = jobData.filter((job)=> job.title.toLowerCase().includes(titleInput) || 
    job.position.toLowerCase().includes(titleInput)) 

   setFilteredJobs(filteredItems)

  }


  const reloadPage = () => {
    window.location.reload();
  };


  useEffect(()=>{
    const initialJobs = [...jobs]
    setJobs(initialJobs)
    setFilteredJobs(initialJobs)
   
  }, [])




  return (
    <div>
      <Search handleSubmit={handleSubmit} handleTitleInput={handleTitleInput} titleInput={titleInput} handleLocationInput={handleLocationInput} locationInput={locationInput} handleFiltering={handleFiltering}/>
      {filteredJobs.length === 0 ? <div className='error-search-container'><p className='error-search' onClick={reloadPage}>Job not available, click to try again</p></div> : null}
      <Jobs  jobs={search ? filteredJobs :currentPosts} filteredJobs={filteredJobs}/>
      {search ? null : <Pagination totalPosts={jobs.length} setCurrentPage={setCurrentPage} postPerPage={postPerPage}/>}
    </div>
  )
}

export default Jobpage