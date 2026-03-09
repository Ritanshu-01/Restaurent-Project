import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { API_BASE } from '../config/api';

function Comments() {
  const [comments,setComments]=useState([])

useEffect(()=>{
   getdata()
   Aos.init({duration:2000})
},[])

const getdata=async()=>{
  let result=await fetch(`${API_BASE}/comments`)
  result=await result.json()
  console.log(result)
  setComments(result)
}

let deleteComment=async(id)=>{
      console.log(id)
      let result = await fetch(`${API_BASE}/comment/${id}`, {
        method: "Delete",
      });
      result = await result.json();
      if (result) {
        /* alert("Comment is deleted"); */
        getdata();
      }
}

  return (
    <div>
       {
              comments.length>0 
             ?
               comments.map((item,index)=>{
                 return <div className="comments" key={index} data-aos="fade-up">
                 <div className="row">
                   <div className="col" id="j1">
                     <div className="j2 pt-1">
                       <div>
                         {" "}
                         <p style={{ color: "red", fontWeight: "bold" }}>{item.name}</p>
                       </div>
                     </div>
           
                     {/* comment */}
                     <div id="j3">
                       <div>
                         <p className="mt-0" style={{ textAlign: "left" }}>
                          {item.comment}
                         </p>
                       </div>
                     </div>
                     <div className="j4">
                       <Link style={{ border: "none", padding: "0px" }} to={"/update/"+item._id} >
                         <img
                           src="https://static.vecteezy.com/system/resources/thumbnails/000/426/006/small/Multimedia__28318_29.jpg"
                           alt=""
                           width="30px"
                           height="35px"
                         />
                       </Link>
           
                       <button style={{ border: "none", padding: "0px" }} onClick={()=>deleteComment(item._id)}>
                         <img
                           src="https://st.depositphotos.com/1005920/2066/i/600/depositphotos_20668883-stock-photo-recycle-red-circle-glossy-web.jpg"
                           alt=""
                           width="48px"
                           height="48px"
                         />
                       </button>
                     </div>
                     <hr />
                   </div>
                   </div>
                 </div>
           
               })
               :
               <p>no comment added</p>
             }
          
         

    </div>
  );
}

export default Comments;
