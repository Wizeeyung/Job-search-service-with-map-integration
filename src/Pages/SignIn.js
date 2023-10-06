import React, { useEffect, useState } from 'react'
import '../components/css/signin.css'
import { database } from '../FirebaseConfig'
import { ToastContainer, toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { addUser, removeUser , clearJobs, adduserSignUpInfo} from '../Redux/cartJobsSlice'
import { useDispatch, useSelector } from 'react-redux'

const SignIn = () => {


  const userInfo = useSelector((state)=> state.cartJobs.userInfo)
  const [login, setLogin] = useState(false)
  const [handleError, setHandleError] = useState(false)
  const [handleEmailError,setHandleEmailError]= useState(false)
  const [emailCheck, setEmailCheck] = useState(false)
  const [passwordCheck, setPasswordCheck] = useState(false)
  const [emailInput, setEmailInput]= useState('')
  const [nameInput, setNameInput] = useState('')
  const [passwordInput, setPasswordInput]= useState('')
  const [lastnameInput, setLastNameInput]= useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    const storedUser = localStorage.getItem('isLoggedIn')
    if (storedUser){
      const {name, lastName, email} = JSON.parse(storedUser);
      dispatch(addUser({
        name,lastName,email
      }))
    }
  },[])


  const handleSubmit = (e, type)=>{
    e.preventDefault()
    
    const email = emailInput
    const password = passwordInput
    const name = nameInput
    const lastName = lastnameInput

    

    if (type === 'signup' && name && email && password && lastName){
      createUserWithEmailAndPassword(database,email,password, name).then((data)=>{
        console.log(data)
        const userInfo = data.user
        dispatch(adduserSignUpInfo({
          id: userInfo.uid,
          email: email,
          name: name,
          lastName: lastName
        }))

      setLogin(true);

      setPasswordInput('');
      setEmailInput('');
      setLastNameInput('');
      setNameInput('');
      setHandleEmailError(false);
      setHandleError(false);
      }).catch((error)=>{ if(error.code){
        setLogin(false)
        alert(error.code)
      }
      })
      toast.success('Signed-up successfully')
        
    

      
     
      

      
    } else if(type === 'signin' && emailCheck && passwordCheck){
      signInWithEmailAndPassword(database,email,password, name).then((data)=>{
        console.log(data)
        const user = data.user;
        dispatch(addUser({
          id: user.uid,
          email: user.email,
          name: name,
          lastName: lastName
        }))
        window.localStorage.setItem('isLoggedIn', JSON.stringify({name,lastName, email}))
        setTimeout(()=> navigate('/'), 1000)
      }).catch((error)=> alert(error.code))
      toast.success('Signed-in successfully')
      
    }
  }



  const handleSignOut = (e)=>{
    e.preventDefault()
    signOut(database).then(()=>{
      dispatch(removeUser())
      dispatch(clearJobs())
      setTimeout(()=> navigate('/'), 1000)
      window.localStorage.removeItem('isLoggedIn')
    })

    toast.success('Signed-out successfully')

  }

  const handleEmail = (e)=>{
    e.preventDefault()
    const input = e.target.value;
    const passwordPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailInput(input)
    setHandleEmailError(true)
    if(passwordPattern.test(input)){
      setEmailCheck(true)
      setHandleEmailError(false)
    } else{
      setEmailCheck(false)
    }
    
  }

  const handlePassword = (e)=>{
    e.preventDefault()
    
    const input = e.target.value
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])[0-9a-zA-Z@#$%^&+=]{8,}$/;
    setPasswordInput(input)
    setHandleError(true)
    if(passwordPattern.test(input)){
      setPasswordCheck(true)
      setHandleError(false)
    } else{
      setPasswordCheck(false)
    }
  }

  const handleName = (e)=>{
    e.preventDefault()
    const input = e.target.value;
    const capitalizednameInput = input.charAt(0).toUpperCase() + input.slice(1);
    setNameInput(capitalizednameInput)
  }


  const handleLastName = (e)=>{
    e.preventDefault()
    const input = e.target.value;
    const capitalizedInput = input.charAt(0).toUpperCase() + input.slice(1);
    setLastNameInput(capitalizedInput);
  }



  return (
    <div className='sign-in'>
      {!userInfo ?
      <>
      <div className='sign-in-btn'>
        <button className={login === false ? 'sign-btn active' : 'sign-btn'} onClick={()=>  setLogin(false) }>Sign Up</button>
        <button className={login === true ? 'sign-btn active' : 'sign-btn'} onClick={()=> setLogin(true)}>Sign In</button>

      </div>
      <div className='sign-in-container'>
        <h1>{login ? 'Sign In' : 'Sign Up'}</h1>
        <form onSubmit={(e)=>handleSubmit(e, login ? 'signin' : 'signup' )}>

          {login ? null : 
          <>
          <div className='form'>
            <label htmlFor='first-name'>First Name:</label>
            <input type='text' name='first-name' placeholder='first name' id='first-name'value={nameInput} onChange={handleName}/>
          </div>
          

          <div className='form'>
            <label htmlFor='last-name'>Last Name:</label>
            <input type='text' name='last-name' placeholder='last name' id='last-name'value={lastnameInput} onChange={handleLastName}/>
          </div>
          </>}

          

          <div className='form'>
            <label htmlFor='email'>Email:</label>
            <input type='email' name='email' placeholder='abcd@gmail.com' id='email'value={emailInput} onChange={handleEmail}/>
          </div>
          { handleEmailError ? <div className='error-msg-container'>
          <p className='error-msg'>Email must be a valid email e.g abcd@gmail.com</p>
          
          </div> : null}

          <div className='form'>
            <label htmlFor='password'>Password:</label>
            <input type='password' name='password' placeholder='e.g Abcd123@' id='password' value={passwordInput} onChange={handlePassword}/>
          </div>
          {handleError ? 
          <div className='error-msg-container'>
          <p className='error-msg'>Password must be at least 8 characters long</p>
          <p className='error-msg'>Password must contain at least 1 digit e.g 123</p>
          <p className='error-msg'>Password must contain one or more capital</p>
          </div>
          : null}
          {!login ? <button className={passwordCheck && emailCheck && nameInput && lastnameInput? null : 'inactive-btn' }>{login ? 'Sign In' : 'Sign Up'}</button> : null}
          {login ? <button className={passwordCheck && emailCheck ? null : 'inactive-btn'}>{login ? 'Sign In' : 'Sign Up'}</button> : null}
        </form>
      </div> 
      </> 
      
      :

       <button className='sign-out' onClick={handleSignOut}>Sign Out</button>}

        <ToastContainer position='top-left' autoClose={2000}
        hideProgressBar={false} newestOnTop={false} closeOnClick
        rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='dark'
        /> 


    </div>
  )
}

export default SignIn