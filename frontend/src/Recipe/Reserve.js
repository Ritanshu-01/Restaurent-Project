import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { API_BASE } from '../config/api';

function Reserve() {
  useEffect(()=>{
    Aos.init({duration:2000})
  })
  let order=localStorage.getItem("order")
  let reserve=localStorage.getItem("reserve")
   const [name,setName]=useState("") 
  const [phone,setPhone]=useState("")
  const [email,setEmail]=useState("")
  const [people,setPeople]=useState("")
  const [date,setDate]=useState("")
  const [time,setTime]=useState("")
  const [dish,setDish]=useState("")
   const [error,setError]=useState(false)
  let navigate=useNavigate()
 

  let clickHandler=async()=>{

    if(!name || !phone || !date || !time || !dish){
      setError(true)
      return false
    }

    console.log(`${name} ${phone} ${people} ${email} ${date} ${time} ${dish}`)
    let result=await fetch(`${API_BASE}/reserve`,{
      method:'post',
      body:JSON.stringify({name,email,date,time,people,dish,phone}),
      headers:{
        'Content-Type':'application/json'
      }
})
result=await result.json()
console.log(result)
 localStorage.setItem("order",JSON.stringify(result)) 
 localStorage.setItem("reserve","Reserved")
 navigate("/updates")
 alert("Congratulations ,You reserved the table")
 navigate("/")

  }

  /* delete */
  let clickHandler1=async()=>{
    
    let id=JSON.parse(order)._id
    console.log(id)

 
  let result = await fetch(`${API_BASE}/order/${id}`, {
    method: "Delete",
  });
  result = await result.json();
  if (result) {
    alert("Your table is cancelled!");
    localStorage.setItem("reserve","Book Table")
        navigate("/")
    localStorage.removeItem("order")
  }

  }

  /* update */
 

  return (
    <div>
      <br />
      <br />
      <div >
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <h3 data-aos="fade-right">Book Your Table!</h3>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6" style={{textAlign:'right'}} data-aos="fade-up">
            <button className="btn cancel-btn" onClick={clickHandler1}>Cancel Booking</button>
            </div>
          </div>
        </div>
      <div className="col-12 cancel">
   
  </div>
  <br />
      <div className="container">
        <div className="row">
        
            <div className="col messageBox reserve-text" data-aos="fade-up">
            <form className="row g-3 border p-3" onSubmit={(e)=>e.preventDefault()}>
              {/* name */}
  <div className="col-md-4">
    <label htmlFor="validationDefault01" className="form-label">Your name</label>
    <input type="text" className="form-control" id="validationDefault01" placeholder="Mandeep Sallan" value={name} onChange={(e)=>setName(e.target.value)}/>
     {error && !name && <span id="emailHelp" className="form-text" style={{color:'red',fontSize:"15px"}}>Please enter a valid name</span>} 
  </div>
  {/* phone number */}
  <div className="col-md-4">
    <label htmlFor="validationDefault02" className="form-label">Phone Number</label>
    <input type="number" className="form-control" id="validationDefault02" placeholder="123-456-7890" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
    {error && !phone && <span id="emailHelp" className="form-text" style={{color:'red',fontSize:"15px"}}>Enter Phone Number</span>} 
      </div>
  {/* email */}
  <div className="col-md-4">
    <label htmlFor="validationDefaultUsername" className="form-label">Email Address</label>
    <div className="input-group">
      <input type="email" className="form-control" id="validationDefaultUsername"  aria-describedby="inputGroupPrepend2" placeholder="man67@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
    </div>
  </div>
  {/* people */}
  <div className="col-md-4">
    <label htmlFor="validationDefault01" className="form-label">No Of People</label>
    <input type="number" className="form-control" id="validationDefault01" placeholder="79"
    value={people} onChange={(e)=>setPeople(e.target.value)} />
  </div>
  {/* date */}
  <div className="col-md-4">
    <label htmlFor="validationDefault02" className="form-label">Date</label>
    <input type="date" className="form-control" id="validationDefault02" placeholder="09-jul-2023" value={date} onChange={(e)=>setDate(e.target.value)} />
    {error && !date && <span id="emailHelp" className="form-text" style={{color:'red',fontSize:"15px"}}>Please enter date</span>} 
  </div>
  {/* Time */}
  <div className="col-md-4">
    <label htmlFor="validationDefaultUsername" className="form-label">Time</label>
    <div className="input-group">
      <input type="time" className="form-control" id="validationDefaultUsername"  aria-describedby="inputGroupPrepend2" placeholder="10A.M" value={time} onChange={(e)=>setTime(e.target.value)} />
     
    </div>
    {error && !time && <span id="emailHelp" className="form-text" style={{color:'red',fontSize:"15px"}}>Please enter time</span>} 
  </div>
  {/* request */}
  <textarea name="" id="" cols="100" rows="4" placeholder='Special Request' value={dish} onChange={(e)=>setDish(e.target.value)} ></textarea>
  {error && !dish && <span id="emailHelp" className="form-text" style={{color:'red',fontSize:"15px"}}>Please enter special dish</span>} 
  <div className="col-12">
    <button className="btn reserve-btn" type="submit" onClick={clickHandler}>{reserve}</button>
  </div>
  
</form>

             

                   </div>
        </div>
      </div>
    </div>
   
    <br />
    
    
    </div>
  )
}

export default Reserve
