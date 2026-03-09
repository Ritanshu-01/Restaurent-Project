require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

// Legacy DB models (for Reserve, Updates, Comments, NewsLetter)
const Update = require('./db/updates');
const Comment = require('./db/comments');
const Reservation = require('./db/orders');

// New API routes (auth, cart, orders)
const apiRoutes = require('./routes/api');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', apiRoutes);

app.post("/updates",async(req,res)=>{
    let update=new Update(req.body)
    let result=await update.save()
    res.send(result)
})

app.post("/reserve",async(req,res)=>{
    let order=new Reservation(req.body)
    let result=await order.save()

    res.send(result)
})

app.delete("/order/:id",async(req,res)=>{
    let result=await Reservation.deleteOne({_id:req.params.id})
    res.send(result)
})

app.delete("/news/:id",async(req,res)=>{
    
    let result=await Update.deleteOne({_id:req.params.id})
    res.send(result)
})

/* comments */
app.post("/comment",async(req,res)=>{
    let comment=new Comment(req.body)
    let result=await comment.save()
    res.send(result)
})
/* get comment */
app.get("/comments",async(req,res)=>{
    const comments=await Comment.find()
if(comments.length>0)
res.send(comments)
else
res.send({result:"result not found"})

})

/* comment delete */
app.delete("/comment/:id",async(req,res)=>{
    let result=await Comment.deleteOne({_id:req.params.id})
    res.send(result)
})

/* comment update */
app.get("/update/:id",async(req,res)=>{
      let result=await Comment.findOne({_id:req.params.id})

      if(result)
      res.send(result)
      else
      res.send({result:"result not found"})
})

/* updation */
app.put("/update/:id",async(req,res)=>{
    let result=await Comment.updateOne({_id:req.params.id},{$set:req.body})
    res.send(result)
})


const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });