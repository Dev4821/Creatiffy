const mongoose= require('mongoose');

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
    }
})
const Post= new mongoose.model("POST",userSchema);
module.exports=Post;