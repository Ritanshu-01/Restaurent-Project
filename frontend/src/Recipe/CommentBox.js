import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Comments from './Comments';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { API_BASE } from '../config/api';

function CommentBox() {
  const [name,setName]=useState("")
  const [comment,setComment]=useState("")
  const [error,setError]=useState(false)
  const navigate=useNavigate()
  useEffect(()=>{
    Aos.init({duration:2000})
  })

  /* handler */
  let clickHandler=async()=>{
    if( !name || !comment){
      setError(true)
      return false
    }
  console.log(`${name} ${comment}`)

  const userId=JSON.parse(localStorage.getItem('user1'))._id
        
  let result=await fetch(`${API_BASE}/comment`,{
        method:'post',
        body: JSON.stringify({name,comment,userId}),
        headers:{
         'Content-Type':'application/json'
        }
        
  })

  result=await result.json()
        console.log(result)
        navigate("/comments")
    

  }
  let auth=localStorage.getItem("user1")
  return (
    <div className='commentBox'>
       <p className='p1 m-3' style={{fontSize:'30px'}} data-aos="fade-right">Add a Comment <span style={{textTransform:'capitalize'}}>{JSON.parse(auth).name} </span></p>
      <div className="container" data-aos="fade-up">
        <div className="row">
        
            <div className="col">
            <form onSubmit={(e)=> e.preventDefault()}>
        <div className="mb-3">
    
    <input type="text" className="form-control" /* id="exampleInputEmail1"  */aria-describedby="emailHelp" placeholder='Your Name' required value={name} onChange={(e)=>setName(e.target.value)} />
    {error && !name && <span id="emailHelp" className="form-text" style={{color:'red',fontSize:"15px"}}>Please enter name</span>}
  </div>
{/* comment */}

  <div className="mb-3">

  <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder='Add a Comment' value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
  {error && !comment && <span id="emailHelp" className="form-text" style={{color:'red',fontSize:"15px"}}>Please enter comment</span>}
</div>

  <button type="submit"  className=" comment-btn" onClick={clickHandler}>Submit</button>
</form>
            </div>
        </div>
      </div>
<br />
<br />
      <Comments></Comments>
    </div>
  )
}

export default CommentBox
