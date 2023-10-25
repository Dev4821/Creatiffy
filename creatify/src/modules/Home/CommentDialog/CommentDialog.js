import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
// import { ReactComponent as Avatar } from "../../assets/avatar.svg";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Button from '@mui/material/Button';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { dialogHeaderText } from "./testConstants";
import Commentarea from "./Commentar";
import './CommentDialog.css';




const CommentDialog = (props) => {
  const { open, postid,handleCommentDialog} = props;
  const[data,setData]=useState("");
  const[data2,setData2]=useState([]);
  




  const handleSubmit= async(e)=>{
    e.preventDefault()
    handleCommentDialog(false)
     
  const response = await fetch('http://localhost:8000/api/comment',{
    method:'POST',
    headers:{
      'content-Type':'application/json',
      Authorization:`Bearer ${localStorage.getItem('user:token')}`
    },
    body:JSON.stringify({
        comment:data,
        postId:postid,
        
    })
  });
  const d2 = await response.json();
  setData2(d2);
  if(response.status===200){
    
  }
  else{
    console.log('Error');
  }
  }
  



  return (
    <div>
      <Dialog   open={open} onClose={() => handleCommentDialog(false)} >
        <DialogTitle className="dialogTitle" >{dialogHeaderText}</DialogTitle>
        {data2 && data2.length > 0 && data2.map(
          ({ _id, comment = "",username = "" }) => {
            return (
              <Commentarea
              
                key={_id}
                
                comment={comment}
               
                username={username}
              />
            );
          }
        )}
        <DialogContent className="dialogContent">
          <TextField className="textField"
            autoFocus
            margin="dense"
            id="name"
            label="comment"
            type="text"
            fullWidth
            variant="standard"
            value={data.caption} 
            onChange={(e) => setData( e.target.value )}
          />
        </DialogContent>
        <DialogActions className="dialogActions">
          <Button className="button" onClick={() => handleCommentDialog(false)}>Cancel</Button>
          <Button  className="button" onClick={(e)=>handleSubmit(e)}>comment</Button>
        </DialogActions>
        
      </Dialog>
    </div>
  );
};

export default CommentDialog;

