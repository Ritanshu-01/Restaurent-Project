import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE } from '../config/api';

function UpdateComment() {
    const [name,setName]=useState("")
    const [comment,setComment]=useState("")
    const [error,setError]=useState(false)
    const navigate=useNavigate()
    const params=useParams()

    useEffect(()=>{
        getdetails()
    },[])
    let getdetails=async()=>{

let id=params.id

         let result=await fetch(`${API_BASE}/update/${id}`) 
         result=await result.json()
         console.log(result)
         setName(result.name)
         setComment(result.comment)
    }

    let clickHandler=async()=>{
        if( !name || !comment){
          setError(true)
          return false
        }
      console.log(`${name} ${comment}`)
      let result=await fetch(`${API_BASE}/update/${params.id}`,{
                 method:'Put',
                 body: JSON.stringify({name,comment}),
                 headers:{
                  'Content-Type':'application/json'
                 }
                 
           })

           result=await result.json()
                if(result)
                navigate("/comments")
      
            
     
      }
      

  return (
    <div>
       <div className='commentBox k1'>
      <div className="container">
        <div className="row">
        
            <div className="col">
            <form onSubmit={(e)=> e.preventDefault()}>
        <div className="mb-3">
    
    <input type="text" className="form-control" /* id="exampleInputEmail1"  */aria-describedby="emailHelp" placeholder='Your Name' required value={name} onChange={(e)=>setName(e.target.value)} />
    {error && !name && <span id="emailHelp" className="form-text" style={{color:'red',fontSize:"15px"}}>Please enter name</span>}
  </div>
{/* comment */}

  <div class="mb-3">

  <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder='Add a Comment' value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
  {error && !comment && <span id="emailHelp" className="form-text" style={{color:'red',fontSize:"15px"}}>Please enter comment</span>}
</div>

  <button type="submit"  className=" comment-btn" onClick={clickHandler}>Update</button>
</form>
            </div>
        </div>
      </div>
<br />
<br />
</div>
    </div>
  )
}

export default UpdateComment
