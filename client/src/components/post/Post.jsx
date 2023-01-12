import "./post.css";
import { MoreVert } from "@material-ui/icons";
import {
  Box
} from '@material-ui/core';
import {
  IconButton,
  Input
} from "@mui/material";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import ThumbUp from "@mui/icons-material/ThumbUp"
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import SyncIcon from "@mui/icons-material/Sync";
// import FavoriteBorderIcon from "@mui/icons-material/Favorite";
// import FavoriteIcon from "@mui/icons-material/Favorite";

import IosShareIcon from "@mui/icons-material/IosShare";
import { Comments, Users } from "../../dummyData";
import { useState } from "react";
import Comment from "../comment/Comment";
import { Link } from "react-router-dom";
import likeImg from "../../img/like.png"
import heartImg from "../../img/heart.png"
import noAvatar from "../../img/person/noAvatar.png"

export default function Post({ post }) {
  // const comments = Comments.filter(comment => comment.postId === post.id)
  const comments = post.comments
  // console.log(comments)

  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [openComment, setOpenComment] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [popup, setPopup] = useState(false)

  const handleOpenComment = () => {
    setOpenComment(!openComment)
  }

  const handleOpenMenuPost = () => {
    setPopup(true)
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
            <Link to={`/profile/${post?.userId}`} >
              <img
                className="postProfileImg"
                // src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
                src={(post?.userId?.profilePicture === "") ? noAvatar : post?.userId?.profilePicture}
                alt=""
              />
            </Link>
            <span className="postUsername">
              <Link to={`/profile/${post?.userId._id}`} style={{color:'#000', textDecoration: 'none' }}>
              
              {/* {Users.filter((u) => u.id === post?.userId)[0].username} */}
              {post?.userId?.username}
              </Link>
            </span>
            
            <span className="postDate">{post.date}</span>
          </div>
            <div className="postTopRight">
              {/* <MoreVert onClick={() => setPopup(true)} /> */}
              <Popup 
                trigger={
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                } 
                position="bottom right"
              >
                <div className={'popup'}>
                    <li>Chỉnh sửa bài viết</li>
                    <li>Ẩn bài viết</li>
                    <li>Xóa bài viết</li>
                </div>
              </Popup>
            </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={likeImg} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={heartImg} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText" onClick={handleOpenComment}>{post.comments.length} comments</span>
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
