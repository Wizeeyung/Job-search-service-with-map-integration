import React from 'react'
import '../components/css/contact.css'
import {Maps, GoogleMapReact} from 'google-map-react'


const ContactUs = () => {
  return (
    <div className='contact'>
    <div className='contact-container'>
      <div className='left-contact'>
       <h1>Contact Us</h1>
        <h3>Get in touch</h3>
        <p><strong>Email:</strong> cartJobs@gmail.com</p>
        <p><strong>Phone:</strong> +447754389065</p>
        <p>This is our contact page, please let us know if there<br/>
          are any enquiries you would love us to attend too.
        </p>

      </div>
      <div className='right-contact'>
        <form className='contact-form'>
          <div className='input-contact'>
            <input type='text' placeholder='Name' />
            <input type='email' placeholder='Email' />
          </div>
          <textarea name='textarea' rows='10' cols='40' placeholder='Message'/>
          <button>Send</button>
        </form>
      </div>
      </div>
      <div className='maps'>
      <iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=flat%201%20seion%20chapel+(cartJobs)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">Find Population on Map</a></iframe>

      </div>
     

    </div>
  )
}

export default ContactUs