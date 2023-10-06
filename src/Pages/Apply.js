import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../components/css/apply.css'
import {IoMdCheckmarkCircle} from 'react-icons/io'
import {GrFormPreviousLink} from 'react-icons/gr'
import jobs from '../services/jobs'
import { useDispatch, useSelector } from 'react-redux'
import { toggleApply, addToAppliedJobs, addUser } from '../Redux/cartJobsSlice'

const Apply = () => {

  
  const [fullJobs, setFullJobs] = useState([])
  const [fnameInput, setfNameInput]= useState('')
  const [lnameInput, setlNameInput] = useState('')
  const [mailInput, setMailInput] = useState('')
  const [cv, setCv] = useState(null)
  const [applied, setApplied] = useState(false)
  const [appliedJobs, setAppliedJobs] =useState([])
  const [handleEmailError, setEmailError] = useState(false)
  
  const [job, setJob] = useState([])
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {item} = location.state

  const jobApplied = useSelector((state)=> state.cartJobs.jobApplied)
  const appliedJobData = useSelector((state)=> state.cartJobs.appliedJobData)
  

  const appliedj = appliedJobData.find((findjob)=> findjob.id === fullJobs.id)
  const applied_ = appliedj ? true : false 
 
  const handlefName = (e)=>{
    e.preventDefault()
    setfNameInput(e.target.value)
  }

  const handlelName = (e)=>{
    e.preventDefault()
    setlNameInput(e.target.value)
  }

  const handlMail = (e)=>{
    e.preventDefault()
    const input = e.target.value;
    const passwordPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setMailInput(input)
    setEmailError(true)
    if(passwordPattern.test(input)){
      setEmailError(false)
      
    }
  }

  const handleCv = (e)=>{
      e.preventDefault()
      setCv(e.target.files[0])
  }

  const allInputActive = mailInput && fnameInput && lnameInput && cv;

  const handleSubmit =(e)=>{
    e.preventDefault()
    // const applied = !item.applied
    const allInputActive = mailInput && fnameInput && lnameInput && cv;
    if(allInputActive){
      setApplied(!applied_)
      dispatch(addToAppliedJobs({
        id: item.id,
        title: item.title,
        company: item.company,
        location: item.location
      }))
      
      // dispatch(toggleApply({id: item.id}))
      // setAppliedJobs(applied)
      // item.applied = true
      // localStorage.setItem(`applied_${item.id}`, JSON.stringify(item.applied))
      
      console.log(applied)
    }


  }

  // useEffect(() => {
  //   if (item) {
  //     const storedAppliedStatus = localStorage.getItem(`applied_${item.id}`);
  //     if (storedAppliedStatus !== null) {
  //       const parsedAppliedStatus = JSON.parse(storedAppliedStatus);
  //       setApplied(parsedAppliedStatus); // Set the applied state in the component
  //       item.applied = parsedAppliedStatus; // Set the applied status in the item object
  //     } else {
  //       setApplied(false); // Set the initial state in case there's no stored status
  //     }
  //   }
  // }, [item]);

  
  
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

      <>
        <h2 className='congrats'>Congratulations <IoMdCheckmarkCircle className='correct'/> you have applied for the role of {job.title}</h2>
        <p className='go-back' onClick={()=>navigate(-1)}><GrFormPreviousLink /> <strong>Go back to Jobs</strong></p>
      </>}

    </div>
  )
}

export default Apply