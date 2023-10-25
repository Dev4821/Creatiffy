const mongoose= require('mongoose');

const commentSchema = new mongoose.Schema({
    uId: String,
    comment: String,
  });

const userSchema=new mongoose.Schema({
    caption:{
        type:String,
        required:true,
       

    },
    description:{
        type:String,
        required:true,
      

    },
    image:{
        type:String,
        required:true
        
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'USER',
        required: true
    },
    comments: [commentSchema],
    likes: {
        type: Number,
    },
})
const Post= new mongoose.model("POST",userSchema);
module.exports=Post;