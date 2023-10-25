import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { ReactComponent as Avatar } from "../../assets/avatar.svg";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Button from '@mui/material/Button';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { dialogHeaderText } from "./testConstants";

const CommentDialog = (props) => {
  const { open, handleCommentDialog} = props;
  return (
    <div>
      <Dialog open={open} onClose={() => handleCommentDialog(false)}>
        <DialogTitle>{dialogHeaderText}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCommentDialog(false)}>Cancel</Button>
          <Button>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CommentDialog;

