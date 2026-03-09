import React, { useEffect } from 'react'
import './Contact.css'
import Footer from './Footer'
import Reserve from './Reserve'
import Aos from 'aos'
 import 'aos/dist/aos.css'

export default function Contact() {
  useEffect(()=>{
    Aos.init({duration:2000})
  })
  return (

     <div>
<br />
<br />
<div className="hero" >
    
    <div className="text" data-aos="fade-up">
    <h1>Say Hii</h1>
    <p><b>We are happy to get in contact with you!</b></p>
    </div>
   
</div>
    
<Reserve></Reserve>

<p className='m-5' data-aos="fade-right"><b>121 Einstein Loop N, Bronx, NY 10475, United States</b></p>

<div className="container" data-aos="fade-up">
  <div className="row">
    <div className="col-sm-12 col-lg-12 col-md-12">
    <iframe className="mp" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1750679.0145499166!2d75.401169!3d31.018030999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1670925152074!5m2!1sen!2sin" width="100%" height="300px" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
<br />
<br />
<br />
    </div>
  </div>
</div>


<Footer></Footer>

    </div>

      )
}
