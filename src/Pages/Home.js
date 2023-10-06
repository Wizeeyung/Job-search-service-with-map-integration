import { useState, useEffect } from 'react'
import React from 'react'
import Banner from '../components/Banner'
import Search from '../components/Search'
import Jobs from '../components/Jobs'
import jobs from '../services/jobs'
import JobsCard from '../components/JobsCard'
import Pagination from '../components/Pagination'
import Testimonials from '../components/Testimonials'
import slides from '../services/CarouselData'




const Home = () => {

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
  console.log(filteredJobs.length)

  const applyFilters = (e, selectedFilter, cartItem) => {
    e.preventDefault()
    // Start with the full list of jobs
    let filteredItems = jobData;

    // Apply the title filter if it's not empty
    if (titleInput.length > 1) {
      filteredItems = filteredItems.filter(
        (job) =>
          job.title.toLowerCase().includes(titleInput) ||
          job.position.toLowerCase().includes(titleInput)
      );
    }

    // Apply the location filter if it's not empty
    if (locationInput.length > 1) {
      filteredItems = filteredItems.filter((job) =>
        job.location.toLowerCase().includes(locationInput)
      );
    }

    // Now apply the selected filters
    if (selectedFilter === 'location') {
      filteredItems = cartItem === 'All' ? jobData : jobData.filter((job)=> job.location === cartItem );
    }

    if (selectedFilter === 'salarie') {
      filteredItems = cartItem === 'All' ? jobData : jobData.filter((job)=> job.salary_range === cartItem)
    }

    if (selectedFilter === 'type') {
      filteredItems = cartItem === 'All' ? filteredItems : filteredItems.filter((job)=> job.type === cartItem)
    }

    // Update the filtered jobs state
    setFilteredJobs(filteredItems);

    // Update the search state
    setSearch(
      titleInput.length > 1 ||
      locationInput.length > 1 ||
      selectedFilter === 'location' ||
      selectedFilter === 'salarie' ||
      selectedFilter === 'type'
    );
  };
  

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
  

  // const handleSubmit = (e)=>{
   
  //   e.preventDefault()
  //   const filteredItems = jobData.filter((job)=> job.title.toLowerCase().includes(titleInput) || 
  //   job.position.toLowerCase().includes(titleInput)) 

  //  setFilteredJobs(filteredItems)

  // }


  const reloadPage = () => {
    window.location.reload();
  };


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

  
  

  


  useEffect(()=>{
    const initialJobs = [...jobs]
    setJobs(initialJobs)
    setFilteredJobs(initialJobs)
   
  }, [])


  return (
    <div>
      <Banner />
      
      <Search handleSubmit={applyFilters} handleTitleInput={handleTitleInput} titleInput={titleInput} handleLocationInput={handleLocationInput} locationInput={locationInput} handleFiltering={applyFilters}/>
      {filteredJobs.length === 0 ? <div className='error-search-container'><p className='error-search' onClick={reloadPage}>Job not available, click to try again</p></div> : null}
      <Jobs  jobs={search ? filteredJobs :currentPosts} filteredJobs={filteredJobs}/>
      {search ? null : <Pagination totalPosts={jobs.length} setCurrentPage={setCurrentPage} postPerPage={postPerPage}/>}
      
      
      {/* <Jobs  jobs={filteredJobs}/> */}
      <Testimonials slides={slides} />
    </div>
  )
}

export default Home







