import React, { useEffect, useState } from 'react'
import '../components/css/signin.css'
import { database } from '../FirebaseConfig'
import { ToastContainer, toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { addUser, removeUser , clearJobs, adduserSignUpInfo} from '../Redux/cartJobsSlice'
import { useDispatch, useSelector } from 'react-redux'

// Define a functional component named 'SignIn'.
const SignIn = () => {

  // Retrieve user information from the Redux store using 'useSelector'.
  const userInfo = useSelector((state)=> state.cartJobs.userInfo)
  //Initialize state variable for useState hook
  const [login, setLogin] = useState(false)
  const [handleError, setHandleError] = useState(false)
  const [handleEmailError,setHandleEmailError]= useState(false)
  const [emailCheck, setEmailCheck] = useState(false)
  const [passwordCheck, setPasswordCheck] = useState(false)
  const [emailInput, setEmailInput]= useState('')
  const [nameInput, setNameInput] = useState('')
  const [passwordInput, setPasswordInput]= useState('')
  const [lastnameInput, setLastNameInput]= useState('')
  // Initialize 'navigate' to enable programmatic navigation.
  const navigate = useNavigate()
  // Initialize 'dispatch' to dispatch actions to the Redux store.
  const dispatch = useDispatch()

  // Use 'useEffect' to execute code after the initial render
  useEffect(()=>{
    // Check if user data is stored in local storage.
    const storedUser = localStorage.getItem('isLoggedIn')
    // If user data exists in local storage, extract and add it to the Redux store.
    if (storedUser){
      const {name, lastName, email} = JSON.parse(storedUser);
      // Dispatch 'addUser' action to add user data to the Redux store.
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

    // Check if it's a signup action and if all required data is provided.
    if (type === 'signup' && name && email && password && lastName){
      // Create a new user account with Firebase authentication.
      createUserWithEmailAndPassword(database,email,password, name).then((data)=>{
        // Get the user information from the response.
        const userInfo = data.user
        // Dispatch 'adduserSignUpInfo' action to add user info to the Redux store.
        dispatch(adduserSignUpInfo({
          id: userInfo.uid,
          email: email,
          name: name,
          lastName: lastName
        }))
      // Set 'login' state to indicate successful signup.
      setLogin(true);
      // Reset input fields and error states.
      setPasswordInput('');
      setEmailInput('');
      setLastNameInput('');
      setNameInput('');
      setHandleEmailError(false);
      setHandleError(false);
      }).catch((error)=>{ if(error.code){
        setLogin(false)
        // Handle signup errors and display a code-based alert.
        alert(error.code)
      }
      })
      // Show a success toast notification.
      toast.success('Signed-up successfully')
        
   
    } 
    // Check if it's a sign-in action and if email and password are valid.
    else if(type === 'signin' && emailCheck && passwordCheck){
      // Sign in the user with Firebase authentication.
      signInWithEmailAndPassword(database,email,password, name).then((data)=>{
        const user = data.user;
        // Dispatch 'addUser' action to add user data to the Redux store.
        dispatch(addUser({
          id: user.uid,
          email: user.email,
          name: name,
          lastName: lastName
        }))
        window.localStorage.setItem('isLoggedIn', JSON.stringify({name,lastName, email}))
        // Navigate to the home page after a delay.
        setTimeout(()=> navigate('/'), 1000)
      }).catch((error)=> alert(error.code))
      toast.success('Signed-in successfully')
      
    }
  }

  //Define a function to handle signout
  const handleSignOut = (e)=>{
    e.preventDefault()
    // Handle signup errors and display a code-based alert.
    signOut(database).then(()=>{
      // Dispatch 'removeUser' action to remove user data from the Redux store.
      dispatch(removeUser())
      // Dispatch 'removeUser' action to remove user data from the Redux store.
      dispatch(clearJobs())
      // Navigate to the home page after a delay.
      setTimeout(()=> navigate('/'), 1000)
      // Navigate to the home page after a delay.
      window.localStorage.removeItem('isLoggedIn')
    })
    // Show a success toast notification.
    toast.success('Signed-out successfully')
  }

  //Define a function to handle email input
  const handleEmail = (e)=>{
    e.preventDefault()
    const input = e.target.value;
    // Define a regular expression pattern to check email validity.
    const passwordPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Set 'emailInput' state with the input value.
    setEmailInput(input)
    // Set 'handleEmailError' state to indicate email input error.
    setHandleEmailError(true)
    // Check if the input matches the email pattern.
    if(passwordPattern.test(input)){
      setEmailCheck(true)
      setHandleEmailError(false)
    } else{
      setEmailCheck(false)
    }
    
  }

  //Define a function to handle password input
  const handlePassword = (e)=>{
    // Prevent the default form submission behavior.
    e.preventDefault()
    // Get the user's password input.
    const input = e.target.value
    // Define a regular expression pattern to check password validity.
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])[0-9a-zA-Z@#$%^&+=]{8,}$/;
    setPasswordInput(input)
    setHandleError(true)
    // Check if the input matches the password pattern.
    if(passwordPattern.test(input)){
      // Set 'passwordCheck' to indicate a valid password.
      setPasswordCheck(true)
      setHandleError(false)
    } else{
      // Set 'passwordCheck' to indicate an invalid password.
      setPasswordCheck(false)
    }
  }

  //Define a function to handle first name input
  const handleName = (e)=>{
    e.preventDefault()
    const input = e.target.value;
    // Capitalize the first letter of the name.
    const capitalizednameInput = input.charAt(0).toUpperCase() + input.slice(1);
    // Set 'lastnameInput' state with the capitalized input.
    setNameInput(capitalizednameInput)
  }

  //Define a function to handle Last name input
  const handleLastName = (e)=>{
    e.preventDefault()
    const input = e.target.value;
    // Capitalize the first letter of the last name.
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