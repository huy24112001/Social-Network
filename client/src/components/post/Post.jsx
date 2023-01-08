import "./post.css";
import { MoreVert } from "@material-ui/icons";
import {
  Box
} from '@material-ui/core';
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import ThumbUp from "@mui/icons-material/ThumbUp"
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SyncIcon from "@mui/icons-material/Sync";
import FavoriteBorderIcon from "@mui/icons-material/Favorite";
import FavoriteIcon from "@mui/icons-material/Favorite";

import IosShareIcon from "@mui/icons-material/IosShare";
import { Comments, Users } from "../../constant/dummyData";
import { useState } from "react";
import Comment from "../comment/Comment";

export default function Post({ post }) {
  const comments = Comments.filter(comment => comment.postId === post.id)
  // console.log(comments)

  const [like,setLike] = useState(post.like)
  const [isLiked,setIsLiked] = useState(false)
  const [openComment, setOpenComment] = useState(false)
  const [commentText, setCommentText] = useState('')

  const handleOpenComment = () => {
    setOpenComment(!openComment)
  }

  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              alt=""
            />
            <span className="postUsername">
              {Users.filter((u) => u.id === post?.userId)[0].username}
            </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.photo} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
            <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText" onClick={handleOpenComment}>{post.comment} comments</span>
          </div>
        </div>
        <Box
              display="flex"
              justifyContent="space-around"
              padding=".2rem 0"
              borderTop="1px solid #ccc"
            >
              {/* <IconButton size="small">
                <ChatBubbleOutlineIcon fontSize="small" />
              </IconButton> */}
              <IconButton onClick={likeHandler} size="small">
                {isLiked ? (
                  <ThumbUp fontSize="small" />
                ) : (
                  <ThumbUpOutlinedIcon fontSize="small" />
                )}
              </IconButton>
              <IconButton size="small" onClick={handleOpenComment}>
                <ChatBubbleOutlineIcon  fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <IosShareIcon fontSize="small" />
              </IconButton>
            </Box>
      {openComment
        ? (

          <Box
            borderTop="1px solid #ccc"
            padding={0.5}
          >
            <Box padding="0.1rem 0.5rem" border="1px solid #ccc" borderRadius={18}>
              <Input
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
                multiline
                rows="1"
                disableUnderline
                type="text"
                placeholder="Post your comment"
                sx={{ width: "100%" }}
              />
            </Box>
            {
              comments?.map((c) => <Comment comment={c}/> )
            }
          </Box>


          )
        : null}
      </div>
    </div>
  );
}
