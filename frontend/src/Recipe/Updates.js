import React, { useEffect } from 'react'
import Aos from 'aos'
 import 'aos/dist/aos.css'
import NewsLetter from './NewsLetter'

function Updates() {
  useEffect(()=>{
    
    Aos.init({duration:2000})
 },[])
  const auth = localStorage.getItem('user1');
  if (!auth) {
    return (
      <div className="p-4 text-center">
        <p>Please log in to view updates.</p>
      </div>
    );
  }
  const userName = JSON.parse(auth)?.name || 'Guest';
  return (
    <div>
      <p className='p1 m-3' style={{fontSize:'30px'}} data-aos="fade-right"> <span style={{textTransform:'capitalize'}}>{userName}</span> read our latest news</p>
      <br />
  {/* first news  */}
  

<div className="card mb-3" data-aos="fade-up">
  <div className="row g-0">
    <div className="col-md-4">
      <img src="https://images.unsplash.com/photo-1669150271911-54d137a23aaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=801&q=80" className="img-fluid rounded-start" alt="..." height="100%"/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <p className="p1 mt-3"><b>Is coffee good for you?</b></p>
        <p clads="mt-3">For most people, moderate coffee consumption can be incorporated into a healthy diet.” Hu said that moderate coffee intake—about 2–5 cups a day—is linked to a lower likelihood of type 2 diabetes, heart disease, liver and endometrial cancers, Parkinson's disease, and depression.</p>
        <p className="card-text"><small className="text-muted">Last updated 14 hours ago</small></p>
      </div>
    </div>
  </div>
  </div>


  <div className="card mb-3" data-aos="fade-up">
  <div className="row g-0">
    <div className="col-md-4">
      <img src="https://images.unsplash.com/photo-1667986968934-bf1fd9db241f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80" className="img-fluid rounded-start" alt="..." height="250px"/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <p className="p1 mt-3"><b>why vegetables are important for us?</b></p>
        <p clads="mt-3">A diet rich in vegetables and fruits can lower blood pressure, reduce the risk of heart disease and stroke, prevent some types of cancer, lower risk of eye and digestive problems, and have a positive effect upon blood sugar, which can help keep appetite in check.</p>
        <p className="card-text"><small className="text-muted">Last updated 10 hours ago</small></p>
      </div>
    </div>
  </div>
  </div>


  <div className="card mb-3" data-aos="fade-up">
  <div className="row g-0">
    <div className="col-md-4">
      <img src="https://images.unsplash.com/photo-1666879578106-0215a1ec8c2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" className="img-fluid rounded-start" alt="..." height="250px"/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <p className="p1 mt-3"><b>why burger is considered as unhealthy food?</b></p>
        <p clads="mt-3">Burgers contain excessive amounts of cholesterol and saturated fat. Meat consists of fat naturally, which increases the cholesterol level. When you have burgers, the cholesterol level rises in the blood, thereby increasing the chances of heart disorders.</p>
        <p className="card-text"><small className="text-muted">Last updated 10 hours ago</small></p>
      </div>
    </div>
  </div>
  </div>

{/* comment box */}
<h1 className="p1 m-4" data-aos="fade-right">Follow us on Youtube </h1>
<div className="container">
  <div className="row" data-aos="fade-up">
    <div className="col-sm-12 col-md-6 col-lg-6">
    <iframe width="100%" height="300px" src="https://www.youtube.com/embed/xVWwDc5aNDM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" poster="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=789&q=80" allowFullScreen></iframe>
    </div>
    <div className="col-sm-12 col-md-6 col-lg-6">
    <iframe width="100%" height="300px" src="https://www.youtube.com/embed/2rOcCug6heU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>
  </div>
</div>
<div className="container">
<div className="row" data-aos="fade-up">
    <div className="col-sm-12 col-md-6 col-lg-6">
    <iframe width="100%" height="300px" src="https://www.youtube.com/embed/AriLkH_5JTk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </div>
      <div className="col-sm-12 col-md-6 col-lg-6">
      <iframe width="100%" height="300px" src="https://www.youtube.com/embed/YDSDwS6B2EA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </div>
    </div> 
</div>

<NewsLetter></NewsLetter>
    </div>
  )
}

export default Updates
