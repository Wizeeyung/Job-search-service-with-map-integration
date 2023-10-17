import React, {useState} from 'react'
import './css/testimonials.css'
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from 'react-icons/bs'

// Define a functional component named 'Testimonials' that accepts a 'slides' prop.
const Testimonials = ({slides}) => {

  // Declare a state variable 'slide' and a function 'setSlide' to manage the current slide.
  const [slide, setSlide] = useState(0)

  // Define a function 'nextSlide' to handle moving to the next slide.
  const nextSlide = ()=>{
    // Update the 'slide' state, looping to the first slide when reaching the end.
    setSlide(slide === slides.length -1 ? 0 : slide + 1)
  }

  // Define a function 'prevSlide' to handle moving to the previous slide.
  const prevSlide = ()=>{
     // Update the 'slide' state, looping to the last slide when at the first slide.
    setSlide(slide === 0 ? slides.length - 1 : slide - 1)
  }


  return (
    <div className='testimonial-container'>
      <h1>Testimonials</h1>
      
      <div className='image-carousel'>
        <BsArrowLeftCircleFill className='arrow arrow-left' onClick={()=> prevSlide()}/>
        {slides.map((img, i)=>{
          return (
            <div key={img.id}>
              <img src={img.src} alt={img.alt}  className={slide === i ? 'slide' : 'slide-hidden'} />
              <div className='carousel-txts'>
                <h3 className={slide === i ? 'carousel-txt' : 'carousel-txt-hidden'} >{img.name}</h3>
                <p className={slide === i ? 'carousel-txt' : 'carousel-txt-hidden'} >{img.description}</p>
              </div>
            </div>
          )
          
        })}
        <BsArrowRightCircleFill className='arrow arrow-right' onClick={()=> nextSlide()}/>
        <span className='indicators'>{slides.map((_, i)=>{
          return <button key={i} onClick={null} className={slide === i ? 'indicator' : 'indicator-inactive'}></button>
        })}</span>
      </div>
     
    </div>
  )
}

export default Testimonials