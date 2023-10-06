import React, { useState } from 'react'
import './css/search.css'

const Search = ({handleTitleInput,titleInput, handleSubmit, handleLocationInput , locationInput, handleFiltering }) => {



  const buttons = [
    {
      category: 'location',
      options: [ 'London','Manchester','Bristol', 'Cambridge', 'Edinburgh', 'Belfast', 'Cardiff', 'Birmingham', 'Glasgow']
    },
    {
      category: 'salarie',
      options: ['£70,000 - £90,000', '£45,000 - £65,000', '£55,000 - £75,000','£60,000 - £80,000', '£50,000 - £70,000', '£80,000 - £100,000', '£60,000 - £80,000']
    },
    {
      category: 'type',
      options: ['full-time', 'contract']
    }
   
  ]
  
  return (
    <div className='search'>
      <div className='search-container'>
        <form onSubmit={handleSubmit}>
          <input type='text' name='title' placeholder='Keyword / Job Title' value={titleInput} onChange={handleTitleInput} />
          <input type='text' name='location' placeholder='Location' value={locationInput} onChange={handleLocationInput} />
          <button>Submit</button>
        </form>
        <div className='btn'>
          {buttons.map((btn, i)=>{
           return (
           <select id={btn.category} key={i} onChange={(e)=>handleFiltering(e,btn.category,e.target.value)}>
            <option value='All'>All {btn.category}s</option>
            {btn.options.map((option, i)=>{
              return <option key={i} value={option}>{option}</option>
            })}
           </select>)
          })}
          {/* <button onChange={()=> handleFiltering()} value='london'></button>
          <button>Occupation</button>
          <button>Experience</button> */}
          {/* <select id='salary' placeholder='salary' onChange={(e)=>handleFiltering(e, 'salary',  e.target.value)}>
            <option value='£70,000 - £90,000'>£70,000 - £90000</option>
            <option value='£60,000 - £80,000'>£60,000 - £80,000</option>
            <option value='£50,000 - £70,000'>£50,000 - £70,000</option>
          </select> */}
          <button>Job Type</button>
        </div> 
      </div>



    </div>
  )
}

export default Search