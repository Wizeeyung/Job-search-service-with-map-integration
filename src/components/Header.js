import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import  logo from '../assets/cartjob-logo.png'
import './css/header.css'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import { useSelector } from 'react-redux'
import {AiOutlineMenuUnfold, AiOutlineCloseCircle} from 'react-icons/ai'

// Define the Header component
const Header = () => {

  // Get user information from the Redux store
  const userInfo = useSelector((state)=> state.cartJobs.userInfo)
  // Use the state to manage the open/close state of the mobile menu
  const [close, setClose] = useState(false)

  // Get job data from the Redux store
  const jobData = useSelector((state)=> state.cartJobs.jobData)
  // Function to open the mobile menu
  const showMenu = ()=>{
    setClose(true)
  }
  // Function to close the mobile menu
  const closeMenu = () =>{
    setClose(!close)
  }

  return (
    <header>
      <Link to='/'><img src={logo} alt='cartjob-logo' /></Link>
      <nav className={close ? 'nav-links' : 'nav-links close'}>
          <NavLink onClick={closeMenu} to='/' className={(navData)=> navData.isActive ? 'link actives': 'link'}>Home</NavLink>
          <NavLink onClick={closeMenu} to='/jobpage' className={(navData)=> navData.isActive ? 'link actives': 'link'}>Jobs</NavLink>
          <NavLink onClick={closeMenu} to='/map' className={(navData)=> navData.isActive ? 'link actives': 'link'}>Map</NavLink>
          <NavLink onClick={closeMenu} to='/contact' className={(navData)=> navData.isActive ? 'link actives': 'link'}>Contact Us</NavLink>
          <NavLink onClick={closeMenu} to='/savedjobs' className={(navData)=> navData.isActive ? 'link actives': 'link'}>{jobData.length>0 ? <AiFillHeart className='heart' /> : <AiOutlineHeart className='heart' />}Saved jobs</NavLink>
          <NavLink onClick={closeMenu} to='/signin' className={(navData)=> navData.isActive ? 'link actives': 'link'}>{userInfo ? 'Sign Out' : 'Sign In'}</NavLink>
          <div onClick={closeMenu} className='link close-menu'><AiOutlineCloseCircle /></div>
         
          
          { userInfo ? <p className='user-info'><strong>Hi, {userInfo.name || userInfo.email}</strong></p> : null }
      </nav>
      <span onClick={showMenu} className='menu-dropdown'><AiOutlineMenuUnfold /></span>
    </header>
  )
}

export default Header