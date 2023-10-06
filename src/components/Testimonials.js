import React, {useState} from 'react'
import './css/testimonials.css'
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from 'react-icons/bs'


const Testimonials = ({slides}) => {

  const [slide, setSlide] = useState(0)

  const nextSlide = ()=>{
    
    setSlide(slide === slides.length -1 ? 0 : slide + 1)
  }

  const prevSlide = ()=>{
    setSlide(slide === 0 ? slides.length - 1 : slide - 1)
  }

  console.log(slides)
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