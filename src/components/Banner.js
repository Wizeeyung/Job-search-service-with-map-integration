import React from 'react'
import { Link } from 'react-router-dom'
import banner from  '../assets/banners.png'
import './css/banner.css'


const Banner = () => {
  return (
    <div className='banner-container'>
      <img src={banner} alt='cartjob-banner' loading='priority' />
      <div className='banner-contents'>
        <h1>Your Number 1 Job <br/><span>Search Solution</span></h1>
        <p>"Elevate your career with Cartjobs. Explore diverse job openings, tailored listings, 
          <br/>and stay updated with trending opportunities. Your path to success starts here."
        </p>
        <Link to='/jobpage'><button>Apply Now</button></Link>
      </div>
    </div>
  )
}

export default Banner