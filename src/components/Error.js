import React from 'react'
import error from '../assets/error.jpg'
import {Link} from 'react-router-dom'
import '../components/css/error.css'

const Error = () => {
  return (
    <>
    <div className='error'>
      <img src={error} alt='error'/>
      <Link to='/'><button>Go back To Home Page</button></Link>
    </div>
   
    </>
  )
}

export default Error