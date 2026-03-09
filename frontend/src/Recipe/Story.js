import React, { useEffect } from 'react'
import './Story.css'
import CommentBox from './CommentBox'
import Aos from 'aos'
 import 'aos/dist/aos.css'
export default function Story() {
  useEffect(()=>{
    Aos.init({duration:2000})
  })
  return (
    <div>
      {/* <h2 className='p1 mt-5'><b>Kitchen's Story</b></h2>
<p><b>This is how our kitchen evolved in new digital era.</b></p> */}

<div className="hero2">
    
    <div className="text2" data-aos="fade-up">
    <h1>Kitchen's Story</h1>
    <p><b>This is how our kitchen evolved in new digital era.</b></p>
    </div>
   
</div>
<hr />

<h4 className='p1 m-4' data-aos="fade-right"><b>Team Members</b></h4>

{/* first card */}
<div className="card mb-3" data-aos="fade-up">
  <div className="row g-0">
    <div className="col-md-4">
      <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" className="img-fluid rounded-start" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <p className='p1'><b>Austil Distel</b></p>
        <p><b>CEO and Manager</b></p>

        <p className="card-text">Maintains staff by recruiting, selecting, orienting, and training employees. Ensures a safe, secure, and legal work environment. Develops personal growth opportunities. Accomplishes staff results by communicating job expectations; planning, monitoring, and appraising job results.
             </p>
          </div>
    </div>
  </div>
</div>


<div className="card mb-3" data-aos="fade-up">
  <div className="row g-0">
    <div className="col-md-4">
      <img src="https://media.istockphoto.com/id/1073416040/photo/head-shot-portrait-of-confident-businesswoman-at-workplace.jpg?s=612x612&w=0&k=20&c=r4b3A3cLM6NmKJ2KPC7B-wk5LuOCDufd4d4Ipb3VJbs=" className="img-fluid rounded-start" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <p className='p1'><b>shafy regol</b></p>
        <p><b>Senior Chef</b></p>

        <p className="card-text">Maintains staff by recruiting, selecting, orienting, and training employees. Ensures a safe, secure, and legal work environment. Develops personal growth opportunities. Accomplishes staff results by communicating job expectations; planning, monitoring, and appraising job results.
          </p>
       </div>
    </div>
  </div>
</div>

<div className="card mb-3" data-aos="fade-up">
  <div className="row g-0">
    <div className="col-md-4">
      <img src="https://img.freepik.com/premium-photo/young-female-manager_53419-7669.jpg" className="img-fluid rounded-start" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <p className='p1'><b>senaya Obex</b></p>
        <p><b>Restaurent Manager</b></p>

        <p className="card-text">Maintains staff by recruiting, selecting, orienting, and training employees. Ensures a safe, secure, and legal work environment. Develops personal growth opportunities. Accomplishes staff results by communicating job expectations; planning, monitoring, and appraising job results.
             </p>
          </div>
    </div>
  </div>
  
</div>
<br />
<CommentBox></CommentBox>
<br />
    </div>
  )
}
