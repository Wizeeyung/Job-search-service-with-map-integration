import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import  logo from '../assets/cartjob-logo.png'
import './css/header.css'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import { useSelector } from 'react-redux'

const Header = () => {

  const userInfo = useSelector((state)=> state.cartJobs.userInfo)
  console.log(userInfo)

 
  const jobData = useSelector((state)=> state.cartJobs.jobData)
  
  

  return (
    <header>
      <Link to='/'><img src={logo} alt='cartjob-logo' /></Link>
      <nav className='nav-links'>
          <NavLink to='/' className={(navData)=> navData.isActive ? 'link actives': 'link'}>Home</NavLink>
          <NavLink to='/jobpage' className={(navData)=> navData.isActive ? 'link actives': 'link'}>Jobs</NavLink>
          <NavLink to='/map' className={(navData)=> navData.isActive ? 'link actives': 'link'}>Map</NavLink>
          <NavLink to='/contact' className={(navData)=> navData.isActive ? 'link actives': 'link'}>Contact Us</NavLink>
          <NavLink to='/savedjobs' className={(navData)=> navData.isActive ? 'link actives': 'link'}>{jobData.length>0 ? <AiFillHeart className='heart' /> : <AiOutlineHeart className='heart' />}Saved jobs</NavLink>
          <NavLink to='/signin' className={(navData)=> navData.isActive ? 'link actives': 'link'}>{userInfo ? 'Sign Out' : 'Sign In'}</NavLink>
         
          { userInfo ? <p className='user-info'><strong>Hi, {userInfo.name || userInfo.email}</strong></p> : null }
      </nav>
    </header>
  )
}

export default Header