import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/css/singlejob.css'
import {PiBagFill} from 'react-icons/pi'
import {HiClock} from 'react-icons/hi'
import {ImLocation} from 'react-icons/im'
import {FaMoneyCheckAlt} from 'react-icons/fa'
import {GiTrophyCup} from 'react-icons/gi'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import logo from '../assets/cartjob-logo.png'
import {GrFormPreviousLink} from 'react-icons/gr'
import { addToFavorites, addUser, removeFavorites, toggleLike } from '../Redux/cartJobsSlice'
import {ClipLoader} from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'

const SingleJobs = () => {

  const [jobs, setJobs] = useState({})
  const [loader, setLoader] = useState(true)
  const [like, setLiked] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  
  
  
  
  const appliedJobData = useSelector((state)=> state.cartJobs.appliedJobData)
  const dispatch = useDispatch()
  // destructuring the passed prop from the jobs card so i can use its prop in the singleJob Page
  const {item , liked, heart} = location.state || {}
  
  // trying to find from the redux store where a job i applied to is equal to the over all job,,
  // if its true then set applied to true so i can use it for passing condition
  const appliedj = appliedJobData.find((findjob)=> findjob.id === jobs.id)
  const applied = appliedj ? true : false
  console.log(applied)
  
 
  // if heart is present, then setLiked to true else if not present setLiked to false
  useEffect(()=>{
    if (heart){
      setLiked(true)
    } else if(!heart){
      setLiked(false)
    }
    
  }, [])

  
  // if item is present from the jobscard then setJobs to Item so i can use it for my UI
  // then in the useEffect i set loader to false for few seconds before the items displays
  useEffect(()=>{
    if (item){
      setJobs(item)
    }

    const loadingTimeout = setTimeout(()=>{
      setLoader(false)
    }, 1000);

    return()=>{
      clearTimeout(loadingTimeout)
    }
  },[item])

  let skills = null

  // if jobs.skills_required is present from the useEffect then map over it, so i can use it for my UI
  if(jobs.skills_required){
    skills = jobs.skills_required.map((skill)=>(
      <p key={skill} className='skill'>{skill}</p>
    ))
  }
  
  

  const handleNotification = ()=>{
    setLiked(!like)
    
    if(!like){
      toast.success(`${jobs.title} is added to favorites`)
    } else{
      toast.error(`${jobs.title} removed from favorites`)
    }
  }

  // setting all titled that been showned to lower case before displaying
  const id = item.title
  const idString = (id)=>{
    return String(id).toLowerCase().split('/').join('')

  }
  const root = idString(id)
  
  // once user clicks on apply job i want to dispatch the state to Apply Component only if is flase
  const applyClick = ()=>{
      if (!applied){
        navigate(`/apply/${root}`,{
          state:{
            item: item,
            liked: liked
          }
        })  

      }
  }




  
  
  return (
    <div className='singlejob-container'>
      
      {loader ? (<div className='spinner'><ClipLoader type='TailSpin' height='50' width='50' color='red'/></div>) : 
        (
        <>
        <div className='singlejob'>
          <div className='single-job-left'>
          <h1>{jobs.title}</h1>
          <p><strong>Company:</strong> {jobs.company}</p>
          <p><strong>Position:</strong>  {jobs.position}</p>
          <p><strong>Description:</strong>  {jobs.description}</p>
          <p className='align'><PiBagFill className='icon-space' /> <span className='space'><strong>Contract Type:</strong></span>  {jobs.type}</p>
          <p className='align'><HiClock className='icon-space'/> <span className='space'><strong>Date Posted:</strong ></span>  {jobs.date_posted}</p>
          <p className='align'><ImLocation className='icon-space'/> {jobs.location}</p>
          <p><strong>Postcode:</strong> {jobs.postcode}</p>
          
          <p className='align'><FaMoneyCheckAlt className='icon-space'/> {jobs.salary_range}</p>
          <p className='align'><GiTrophyCup className='icon-space'/> {jobs.experience_level}</p>
        </div>
        <div className='single-job-right'>
          <button onClick={applyClick}>{applied ? 'Applied' : 'Apply Now'}</button>
          <p className='skill-heading'>Skills:</p>
          <div className='skills'>
            {skills}
          </div>
          <button className='align' onClick={()=>  
            dispatch(addToFavorites({
              id: jobs.id,
              title: jobs.title,
              company: jobs.company,
              salary: jobs.salary_range,
              contract: jobs.type,
              location: jobs.location
            })) & handleNotification()
        }>{like ? <AiFillHeart className='icon-space'/> : <AiOutlineHeart className='icon-space'/>} {like ? 'Remove from favorites' : 'Add To Favorites'}</button>
          <img src={logo} alt='logo'/>
          <p className='align' onClick={()=>navigate(-1)}><GrFormPreviousLink /> <strong>Go back to Jobs</strong></p>
        </div>
      </div>
      </>
      )}

      <ToastContainer position='top-left' autoClose={2000}
        hideProgressBar={false} newestOnTop={false} closeOnClick
        rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='dark'
        
        /> 
      

    </div>
  )
}

export default SingleJobs