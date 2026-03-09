import React from 'react'

function Review() {
  return (
    <div>
       <div >
        <h1 class="p1 m-4">Leave a Message</h1>
      <div className="container">
        <div className="row">
        
            <div className="col messageBox">

            <form onSubmit={(e)=> e.preventDefault()}>
        <div className="mb-3">
    
    <input type="text" className="form-control" /* id="exampleInputEmail1"  */aria-describedby="emailHelp" placeholder='Your Name' required />
    </div>

    <div className="mb-3">
    
    <input type="number" className="form-control" /* id="exampleInputEmail1"  */aria-describedby="emailHelp" placeholder='Phone Number' required />
    </div>

  <div className="mb-3">
 
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email Address' 
     required/>
    </div>

    <div class="mb-3">

<textarea class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder='Write a Message'></textarea>
</div>

  <button type="submit"  className=" comment-btn" >Submit</button>
</form>
            </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Review
