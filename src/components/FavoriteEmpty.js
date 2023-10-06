import React from 'react'
import {BiArrowBack} from 'react-icons/bi'
import { Link } from 'react-router-dom'

const FavoriteEmpty = () => {
  return (
    <div className='favorite-empty'>
      <h2>There are currently no jobs added to favorites</h2>
      <Link to='/'className='back-link'><p className='back'> <BiArrowBack className='icon' /> <strong>Go back to jobs</strong> </p></Link>

    </div>
  )
}

export default FavoriteEmpty