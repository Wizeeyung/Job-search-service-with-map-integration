import React from 'react'
import './css/pagination.css'

// Define a functional component named 'Pagination' that accepts three props
const Pagination = ({totalPosts, postPerPage, setCurrentPage}) => {

  // Initialize an empty array 'pages' to store the page numbers for pagination.
  let pages = [];

  // Loop to calculate the number of pages required based on the total posts and posts per page.
  for(let i = 1; i<= Math.ceil(totalPosts/ postPerPage); i++){
    // Add page numbers to the 'pages' array.
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