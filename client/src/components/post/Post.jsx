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
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ThumbUp from "@mui/icons-material/ThumbUp"
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import SyncIcon from "@mui/icons-material/Sync";
// import FavoriteBorderIcon from "@mui/icons-material/Favorite";
// import FavoriteIcon from "@mui/icons-material/Favorite";

import IosShareIcon from "@mui/icons-material/IosShare";
import { Comments, Users } from "../../dummyData";
import { useContext, useEffect, useState } from "react";
import Comment from "../comment/Comment";
import { Link } from "react-router-dom";
import likeImg from "../../img/like.png"
import heartImg from "../../img/heart.png"
import noAvatar from "../../img/person/noAvatar.png"
import { display } from "@mui/system";
import Context from "../../store/context";
import service from "../../service";
import { formatDistance} from 'date-fns';
import { useSelector } from 'react-redux'

export default function Post({ post }) {
  // const comments = Comments.filter(comment => comment.postId === post.id)
  const [state , dispatch] = useContext(Context)
  const socket = state.socket
  const infoUser = state.infoUser
  // console.log(comments)

  const timestamp = post?.createdAt ? new Date(post?.createdAt) : '';

  const [like,setLike] = useState(post?.likes?.length)
  const [isLiked,setIsLiked] = useState(post?.likes.some(userId => userId === infoUser._id))
  const [openComment, setOpenComment] = useState(false)
  const [comments, setComments] = useState([])
  const [oldComments, setOldComments] = useState(post.comments)
  const [commentText, setCommentText] = useState('')
  const [popup, setPopup] = useState(false)

  const handleOpenComment = () => {
    setOpenComment(!openComment)
  }

  const userAvatar = (post?.userId?.profilePicture === "") ? noAvatar : post?.userId?.profilePicture

  const handleOpenMenuPost = () => {
    setPopup(true)
  }

  const handleKeyPress = async (e) => {
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      // handleSendMessage();
      // console.log(commentText)
      socket.emit('comment', {
        user: infoUser,
        post: post._id,
        content: commentText
      })
      await service.postService.createComment({data: {
        user: infoUser._id,
        post: post._id,
        content: commentText
      }, token: infoUser.token})
      setCommentText('')
    }
  };

  // useEffect(() => {
  //   if(socket){
  //       socket.emit('joinRoom', post._id)
  //   }
  // },[socket, post._id])

  useEffect(() => {
    if (socket){
      socket.on('replyComment', (data) => {
        if(data.post === post._id){
          setComments([...comments, data])
        }
        // console.log(data)
      })
    }

  }, [socket, comments])

  useEffect(() => {
    if (socket){

      socket.once('like', (data) => {
        if(data.post === post._id){
          setLike(data.isLiked ? like+1 : like-1)
          console.log(data)
        }
      })
    }

  }, [socket, like])

  const likeHandler = async ()=>{
    socket.emit('sendLike', {
      post: post._id,
      isLiked: !isLiked
    })

    await service.postService.likePost({
      id: post._id,
      token: infoUser.token
    })

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
                src={userAvatar}
                alt=""
              />
            </Link>
            <span className="postUsername">
              <Link to={`/profile/${post?.userId._id}`} style={{color:'#000', textDecoration: 'none' }}>
              
              {/* {Users.filter((u) => u.id === post?.userId)[0].username} */}
              {post?.userId?.username}
              </Link>
            </span>
            
            <span className="postDate">
            {formatDistance(Date.now(), timestamp, {addSuffix: true})}{" "}
  
            </span>
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
                  <div className="popupList">
                    <li className="popupItem">
                      <ModeEditOutlinedIcon style={{marginRight: 5}}/>
                      Chỉnh sửa bài viết
                    </li>
                    <li className="popupItem">
                      <NotificationsOffOutlinedIcon style={{marginRight: 5}}/>
                      Tắt thông báo về bài viết này
                    </li>
                    {
                      post?.userId?._id === infoUser._id 
                      ?  (
                        <li className="popupItem">
                          <DeleteForeverOutlinedIcon style={{marginRight: 5}}/> 
                          Xóa bài viết
                        </li>
                      )
                      : (
                        <li className="popupItem">
                          <CancelOutlinedIcon style={{marginRight: 5}}/> 
                          Ẩn bài viết
                        </li>
                      )
                    }
                    
                  </div>
                </div>
              </Popup>
            </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post?.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={likeImg} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={heartImg} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText" onClick={handleOpenComment}>{post?.comments?.length + comments.length} comments</span>
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
            sx = {{
              borderTop:"1px solid #ccc",
              padding:'0.5',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                paddingTop: '2px'
              }}
            >

              <Box
                component="img"
                sx={{
                  height: 32,
                  width: 32,
                  borderRadius:'50%',
                  marginRight:'5px'
                }}
                alt="avatar"
                src={userAvatar}

              />
              <Box padding="0.1rem 0.5rem" border="1px solid #ccc" borderRadius={18} width='100%'>
                <Input
                  onChange={(e) => setCommentText(e.target.value)}
                  value={commentText}
                  multiline
                  rows="1"
                  disableUnderline
                  type="text"
                  placeholder="Post your comment"
                  sx={{ width: "100%" }}
                  onKeyDown={handleKeyPress}
                />
              </Box>
            </Box>
            {
              oldComments?.map((c) => <Comment key={c._id} comment={c}/> )
            }
            {
              comments?.map((c) => <Comment key={c._id} comment={c}/> )
            }
          </Box>
          )
        : null}
      </div>
    </div>
  );
}
