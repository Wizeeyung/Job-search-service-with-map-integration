import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../components/css/apply.css'
import {IoMdCheckmarkCircle} from 'react-icons/io'
import {GrFormPreviousLink} from 'react-icons/gr'
import jobs from '../services/jobs'
import { useDispatch, useSelector } from 'react-redux'
import { addToAppliedJobs} from '../Redux/cartJobsSlice'

// Define a functional component named 'Apply'.
const Apply = () => {

  //Declare a state variable for all useState hooks
  const [fullJobs, setFullJobs] = useState([])
  const [fnameInput, setfNameInput]= useState('')
  const [lnameInput, setlNameInput] = useState('')
  const [mailInput, setMailInput] = useState('')
  const [cv, setCv] = useState(null)
  const [applied, setApplied] = useState(false)
  const [handleEmailError, setEmailError] = useState(false)
  const [job, setJob] = useState([])
  // Get the current location using the 'useLocation' hook.
  const location = useLocation()
  // Get the 'dispatch' function from Redux for dispatching actions.
  const dispatch = useDispatch()
  // Get the 'navigate' function from 'react-router-dom' for routing.
  const navigate = useNavigate()
  // Destructure the 'item' object from the 'location.state'.
  const {item} = location.state

  // const jobApplied = useSelector((state)=> state.cartJobs.jobApplied)
  
  // Get the 'appliedJobData' from the Redux store using 'useSelector'.
  const appliedJobData = useSelector((state)=> state.cartJobs.appliedJobData)
  // Check if the current job is already applied.
  const appliedj = appliedJobData.find((findjob)=> findjob.id === fullJobs.id)
  // Set 'applied_' to 'true' if the job is already applied, otherwise 'false'.
  const applied_ = appliedj ? true : false 
 // Define a function to handle changes in the first name input.
  const handlefName = (e)=>{
    e.preventDefault()
    setfNameInput(e.target.value)
  }
  // Define a function to handle changes in the last name input.
  const handlelName = (e)=>{
    e.preventDefault()
    setlNameInput(e.target.value)
  }
  // Define a function to handle changes in the email input.
  const handlMail = (e)=>{
    e.preventDefault()
    const input = e.target.value;
    // Define a regex pattern for a valid email.
    const passwordPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Update the email input and set the email error to 'true'.
    setMailInput(input)
    setEmailError(true)
    if(passwordPattern.test(input)){
      setEmailError(false)
      
    }
  }

  // Update the CV file using the selected file.
  const handleCv = (e)=>{
      e.preventDefault()
      setCv(e.target.files[0])
  }

  // Calculate whether all input fields are active (filled).
  const allInputActive = mailInput && fnameInput && lnameInput && cv;

  // Define a function to handle submission for applied jobs.
  const handleSubmit =(e)=>{
    e.preventDefault()
    const allInputActive = mailInput && fnameInput && lnameInput && cv;
    // If all fields are filled, toggle the 'applied' state.
    if(allInputActive){
      setApplied(!applied_)
      dispatch(addToAppliedJobs({
        id: item.id,
        title: item.title,
        company: item.company,
        location: item.location
      })) 
    }
  }

  // Update state variables based on the selected job.
  useEffect(()=>{
    if (item){
    setApplied(applied_)
    setJob(item)
    setFullJobs(jobs)}
  },[])

  
  return (
    <div className='application-form'>
      {!applied ?
      <>
      <h1>Apply for {job.title} at {job.company}</h1>
      <form onSubmit={handleSubmit}>
        <div className='apply-form'>
          <label htmlFor='first-name'>First Name:</label>
          <input type='text' name='first-name' placeholder='first name' id='first-name' value={fnameInput} onChange={handlefName}/>
        </div>

        <div className='apply-form'>
          <label htmlFor='last-name'>Last Name:</label>
          <input type='text' name='last-name' placeholder='last name' id='last-name' value={lnameInput} onChange={handlelName}/>
        </div>

        <div className='apply-form'>
          <label htmlFor='last-name'>Email:</label>
          <input type='email' name='email' placeholder='email' id='email' value={mailInput} onChange={handlMail}/>
        </div>
        { handleEmailError ? <div className='error-msg-container'>
          <p className='error-msg'>Email must be a valid email e.g abcd@gmail.com</p>
          
          </div> : null}
          
        <div className='apply-form'>
          <label htmlFor='cv'>Upload CV:</label>
          <input type='file' name='cv'  id='cv' accept='.pdf,.doc, .docx' onChange={handleCv} />
        </div>

        <button className={allInputActive ? null : 'inactive-btn'}>Submit</button>

      </form>
      </> :

      <div className='congratulations'>
        <h2 className='congrats'>Congratulations <IoMdCheckmarkCircle className='correct'/> you have applied for the role of {job.title}</h2>
        <p className='go-back' onClick={()=>navigate(-1)}><GrFormPreviousLink /> <strong>Go back to Jobs</strong></p>
      </div>}

    </div>
  )
}

export default Apply