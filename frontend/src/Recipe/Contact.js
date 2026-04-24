import React, { useEffect } from 'react'
import './Contact.css'
import Footer from './Footer'
import Reserve from './Reserve'
import Aos from 'aos'
 import 'aos/dist/aos.css'

export default function Contact() {
  useEffect(()=>{
    Aos.init({duration:2000})
  }, [])
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

<div className="container py-4" data-aos="fade-up">
  <div className="row g-4">
    <div className="col-sm-12 col-lg-5 col-md-6">
      <div className="bg-white rounded-4 shadow-sm p-4 h-100">
        <h3 className="mb-3" style={{color:'#111'}}>Chandigarh, India</h3>
        <p className="mb-2"><b>Address:</b> SCO 117-118, Sector 17C, Chandigarh, 160017, India</p>
        <p className="mb-2"><b>Phone:</b> +91 172 400 1122</p>
        <p className="mb-0"><b>Email:</b> reservations@crispykitchen.in</p>
      </div>
    </div>
    <div className="col-sm-12 col-lg-7 col-md-6">
      <iframe
        title="Crispy Kitchen Chandigarh Map"
        className="mp rounded-4 shadow-sm"
        src="https://www.google.com/maps?q=Sector%2017C%20Chandigarh&output=embed"
        width="100%"
        height="320"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  </div>
</div>


<Footer></Footer>

    </div>

      )
}
