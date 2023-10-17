import React from 'react'
import {ImLocation} from 'react-icons/im'
import {FaMoneyCheckAlt} from 'react-icons/fa'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import {FaPeopleArrows} from 'react-icons/fa'
import { addToFavorites} from '../Redux/cartJobsSlice'
import './css/job.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

// Define the JobsCard component
const JobsCard = ({jobs}) => {

  // Get job data from the Redux store
  const jobData = useSelector((state)=> state.cartJobs.jobData)
  // Get the navigation function from the routing library
  const navigate = useNavigate()
  // Get the dispatch function for Redux actions
  const dispatch = useDispatch()

  // finding the JobData from Redux from the whole jobs and if it finds set liked to true else false
  const items = jobData.find((job)=> job.id === jobs.id)
  // if the items is true then liked should be true , otherwise false
  const liked = items ? true : false;
 
 

// Handle notifications for adding/removing from favorites
  const handleNotification = ()=>{
    if(!liked){
      toast.success(`${jobs.title} is added to favorites`)
    } else{
      toast.error(`${jobs.title} removed from favorites`)
    }

    // Dispatch an action to add or remove from favorites in Redux
    dispatch(addToFavorites({
      id: jobs.id,
      title: jobs.title,
      company: jobs.company,
      salary_range: jobs.salary_range,
      contract: jobs.type,
      location: jobs.location,
      position: jobs.position,
      description: jobs.description,
      type: jobs.type,
      postcode: jobs.postcode,
      skills_required: jobs.skills_required,
      experience_level: jobs.experience_level,
      date_posted: jobs.date_posted,
    }))
  }

  // useEffect(() => {
  //   const storedFavorites = JSON.parse(localStorage.getItem('addFavorites')) || [];
  //   dispatch(addToFavorites(storedFavorites));
  // }, []);

  
  // Generate a unique 'root' based on the job title
  const id = jobs.title
  const idString = (id)=>{
    return String(id).toLowerCase().split('/').join('')

  }
  const root = idString(id)
  
  // Navigate to the single job page with the job data and 'liked' status
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