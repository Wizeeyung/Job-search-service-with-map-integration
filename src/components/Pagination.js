import React from 'react'
import './css/pagination.css'

const Pagination = ({totalPosts, postPerPage, setCurrentPage}) => {

  let pages = [];

  for(let i = 1; i<= Math.ceil(totalPosts/ postPerPage); i++){
    pages.push(i)
  }

  return (
    <div className='pagination'>
      <div className='pagination-container'>
        {pages.map((page,i)=>{
          return <button key={i} className='page-button' onClick={()=> setCurrentPage(page)}>{page}</button>
        })}
      </div>
    </div>
  )
}

export default Pagination