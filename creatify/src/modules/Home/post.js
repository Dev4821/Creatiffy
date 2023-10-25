import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Avatar } from "../../assets/avatar.svg";
import CommentDialog from "./CommentDialog";

const Post = (props) => {
  const { likes, loggedInUser } = props;
  let likesArray = [];
  likes.map(like => {
    likesArray.push(like.uId);
  })
  console.log(loggedInUser,likesArray,likesArray.includes(loggedInUser))
  const navigate = useNavigate();
  const [commentDialog, setCommentDialog] = useState(false);
  const [like, setLike] = useState(likesArray.includes(loggedInUser));
  const [nlike, setnlike] = useState(likesArray.length);
  const handleCommentDialog = (value) => {
    setCommentDialog(value);
  };

  const handlelike = async (e) => {
    e.preventDefault();

    console.log(like);
    const response = await fetch("http://localhost:8000/api/like", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("user:token")}`,
      },
      body: JSON.stringify({
        like: !like,
        postId: props.postId,
      }),
    });
    const likedata = await response.json();
    setnlike(likedata.length);
    setLike(!like);

  };

  return (
    <div className="bg-white w-[80%]  mx-auto mt-32">
      <div className="border-b  flex items-center mx-5   pb-4 ">
        <div
          className="my-5 flex items-center"
          onClick={() => navigate(`/user/${props.user?._id}`)}
        >
          <Avatar width={"50px"} height={"50px"} />
          <div className="ml-4">
            <h3>{props.user.username}</h3>
            <p>{props.user.email}</p>
          </div>
        </div>
      </div>
      <div className="border-b pb-4 my-4 ">
        <div className="h-[400px] flex justify-center items-center ">
          <img
            src={props.url}
            alt="there is a post"
            className="rounded-xl max-h-full"
          />
        </div>
      </div>
      <div className="mx-10  ">{props.caption}</div>
      <div className="mx-10 ">{props.description}</div>
      <div className="border-b">
        <div className="flex justify-evenly my-5 ">
          <div onClick={(e) => {
            handlelike(e);
          }}>
            {like ? <span>❤️</span> : <span>🖤</span>}
            like:{nlike}
          </div>
          <div
            className="commentbutton"
            onClick={() => handleCommentDialog(true)}
          >
            Comments
          </div>
          <div>10.5k shares</div>
        </div>
      </div>

      <CommentDialog
        open={commentDialog}
        postid={props.postId}
        handleCommentDialog={handleCommentDialog}
      />
    </div>
  );
};

export default Post;
