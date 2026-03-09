import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { API_BASE } from '../config/api';


function NewsLetter() {
  useEffect(()=>{
    
    Aos.init({duration:2000})
 },[])

  let newsSubscriber=localStorage.getItem("newsSubscriber")
  let candidate=localStorage.getItem("candidate")
const navigate=useNavigate()
  const [email,setEmail]=useState("")
  const [error,setError]=useState(false)
  
let clickHandler=async()=>{
  if(!email){
    setError(true)
    return false
  }
  let result=await fetch(`${API_BASE}/updates`,{
    method:'post',
    body:JSON.stringify({email}),
    headers:{
      'Content-Type':'application/json'
    }
})
result=await result.json()
console.log(result)

 localStorage.setItem("candidate","Subscribed") 
 localStorage.setItem("newsSubscriber",JSON.stringify(result))
 navigate("/news")
}
/* delete */
let clickHandler1=async()=>{
    
  let id=JSON.parse(newsSubscriber)._id
  console.log(id)


 let result = await fetch(`${API_BASE}/news/${id}`, {
  method: "Delete",
});
result = await result.json();
if (result) {
  alert("You are unsubscribed from News Letter");
  localStorage.setItem("candidate","Subscribe") 
      navigate("/updates")
  localStorage.removeItem("newsSubscriber")
}

}


  return (
    <div>
         <h1 className="p1 m-4" data-aos="fade-right">NewsLetter Signup</h1>

      <div className="container newshead">
        <div className="row" data-aos="fade-up">
            <div className="col-sm-12 col-md-12 col-lg-6" data-aos="fade-up">
<img src="https://images.unsplash.com/photo-1487611459768-bd414656ea10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" width="260px" height="260px" className='newsImage'/>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 news-text" data-aos="fade-up">
                <h4 data-aos="fade-right">Our Newsletter</h4>
                <p data-aos="fae-right">the food news every day</p>
                {/* news letter */}
            <form onSubmit={(e)=> e.preventDefault()}>
        <div className="mb-3">
    
    <input type="email" className="form-control" /* id="exampleInputEmail1"  */aria-describedby="emailHelp" placeholder='Your email address' value={email} onChange={(e)=>setEmail(e.target.value)} />
    {error && !email && <span id="emailHelp" className="form-text" style={{color:'red',fontSize:"15px"}}>Please enter email</span>}

    </div>
    <button className='news-btn' onClick={clickHandler}>{candidate}</button>
    <div id="emailHelp" className="form-text">By signing up,You agree to our Privacy Notice and the data Policy</div>
    </form>
    <button className='news-btn2' onClick={clickHandler1}>Unsubscribe</button>

  </div>
      
        </div>
      </div>
    
    </div>
  )
}

export default NewsLetter
