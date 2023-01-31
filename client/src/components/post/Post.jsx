import "./post.css";
import { MoreVert } from "@material-ui/icons";
import {
  Box
} from '@material-ui/core';
import {
  IconButton,
  Input
} from "@mui/material";
import vi from "date-fns/locale/vi";
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
import { useContext, useEffect, useState } from "react";
import Comment from "../comment/Comment";
import { Link } from "react-router-dom";
import likeImg from "../../img/like.png"
import heartImg from "../../img/heart.png"
import noAvatar from "../../img/person/noAvatar.png"
import Context from "../../store/context";
import service from "../../service";
import getTimeAgo from "../../time/GetTimeAgo";

import { formatDistance} from 'date-fns';
import { Cancel } from "@mui/icons-material";
import Share from "../share/Share";

export default function Post({ post }) {
  // const comments = Comments.filter(comment => comment.postId === post.id)
  const [state , dispatch] = useContext(Context)
  const socket = state.socket
  const infoUser = state.infoUser
  console.log(post.comments)

  const timestamp = post?.createdAt ? new Date(post?.createdAt) : '';

  const [like,setLike] = useState(post?.likes?.length)
  const [isLiked,setIsLiked] = useState(post?.likes.some(userId => userId === infoUser._id))
  const [openComment, setOpenComment] = useState(false)
  const [comments, setComments] = useState([])
  const [oldComments, setOldComments] = useState( post.comments)
  const [commentText, setCommentText] = useState('')
  const [display, setDisplay] = useState(true)
  const [open, setOpen] = useState(false);
  const initialPost = {
    userId: infoUser._id,
    desc: post?.desc,
    img: post?.img
  }

  const [postModify, setPostModify] = useState(initialPost)
  const [file, setFile] = useState(null);

  const closeModal = () => setOpen(false);

  const handleOpenComment = () => {
    setOpenComment(!openComment)
  }

  const userAvatar = (post?.userId?.profilePicture === "") ? noAvatar : post?.userId?.profilePicture


  const handleKeyPress = async (e) => {
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      // handleSendMessage();
      // console.log(commentText)
      socket.emit('comment', {
        user: infoUser,
        post: post._id,
        content: commentText,
        // user: infoUser._id
      })
      // await service.postService.createComment({data: {
      //   user: infoUser._id,
      //   post: post._id,
      //   content: commentText
      // }, token: infoUser.token})
      setCommentText('')

      await service.notification.postNotification({
        userId : post.userId,
        username : infoUser.username,
        status : false,
        action: "comment",
        userId2: infoUser._id,
        post : post._id
      })

      socket.emit('notification',{
      })
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
        console.log(data)
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
    if(!isLiked){
      await service.notification.postNotification({
        userId : post.userId,
        username : infoUser.username,
        status : false,
        action: "like",
        userId2: infoUser._id,
        post : post._id
      })

      socket.emit('notification',{
      })
    }

    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  const handleOpenModify = () => {
    
  }

  const handleDeletePost = async () => {
    // console.log(post)
    await service.postService.deletePost({
      id: post._id,
      token: infoUser.token
    })
  }

  return (
    <>
    
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
                  // modal
                  nested
                  position="bottom right"
                >
                  {close => (<div className={'popup'}>
                    <div className="popupList">
                      {
                        (post?.userId?._id === infoUser._id ) ? (
                          <>
                            <li className="popupItem" onClick={() => {
                              handleOpenModify()
                              setOpen(o => !o)
                              close()
                            }}>
                              
                              <ModeEditOutlinedIcon style={{marginRight: 5}}/>
                              Chỉnh sửa bài viết
                            </li>
                          
                          
                          </>
                          
                        ) : null
                      }
                      <li className="popupItem" onClick={() => {
                        close()
                      }}>
                        <NotificationsOffOutlinedIcon style={{marginRight: 5}}/>
                        Tắt thông báo về bài viết này
                      </li>
                      {
                        (post?.userId?._id === infoUser._id )
                        ?  (
                          display ? (
                            <li className="popupItem" onClick={() => {
                              handleDeletePost()
                              setDisplay(false)
                              close()
                            }}>
                              <DeleteForeverOutlinedIcon style={{marginRight: 5}}/> 
                              Xóa bài viết
                            </li>
                          ) : null
                          
                        )
                        : ( 
                          display ? (
                            <li className="popupItem" onClick={() => {
                              setDisplay(false)
                              close()
                            }}>
                              <CancelOutlinedIcon style={{marginRight: 5}}/> 
                              Ẩn bài viết
                            </li>
                          ) : (
                            <li className="popupItem" onClick={() => {
                              setDisplay(true)
                              close()
                            }}>
                              <CancelOutlinedIcon style={{marginRight: 5}}/> 
                              Hiện bài viết
                            </li>
                          )
                        )
                      }
                      
                    </div>
                  </div>)}
                </Popup>
              </div>
          </div>
          {
            display ? (
              <>
          <div className="postCenter">
            <span className="postText">
              {/* {post?.desc.length > 500 ? `${post?.desc.substring(0,500)}...` : post?.desc} */}
              {post?.desc}
            </span>
            <img className="postImg" src={post?.img} alt="" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img className="likeIcon" src={likeImg}  alt="" />
              <img className="likeIcon" src={heartImg} alt="" />
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
                      <div style={{display:"flex",flexDirection:"row",margin:5}}>
                    <ThumbUp fontSize="small" style={{color:'#0571ED'}} />
                      <p style={{marginLeft:7,fontSize:15,color:'#2F81F5',fontWeight:550,marginTop:2}}>Thích</p>
                      </div>
                  ) : (
                      <div style={{display:"flex",flexDirection:"row",margin:5}}>
                    <ThumbUpOutlinedIcon fontSize="small" />
                    <p style={{marginLeft:7,fontSize:15,fontWeight:550,marginTop:2}}>Thích</p>
                    </div>
                  )}
                </IconButton>


                <IconButton size="small" onClick={handleOpenComment}>
                  <ChatBubbleOutlineIcon  fontSize="small" />
                  <p style={{marginLeft:7,fontSize:15,fontWeight:550}}>Bình luận</p>
                </IconButton>
                <IconButton size="small" >
                  <IosShareIcon fontSize="small" style={{marginTop:-5}} />
                  <p style={{marginLeft:7,fontSize:15,fontWeight:550}}>Chia sẻ</p>
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
                  paddingTop: '2px',
                  // marginTop: '20px'
                }}
              >

                <Box
                  component="img"
                  sx={{
                    display: 'flex',
                    paddingTop: '2px',
                    marginTop: '15px',
                    height: 32,
                    width: 32,
                    borderRadius:'50%',
                    marginRight:'5px'
                  }}
                  alt="avatar"
                  src={infoUser?.profilePicture}

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
              </>
            ) : (
              <div>
                  "This post has been hide"
              </div>
            )
          }
          
        </div>
      </div>
      <Popup
        open={open} closeOnDocumentClick onClose={closeModal}
        modal
        nested
        className='modify'
      >
        {close => (
          <div className='modal'>
            <div className='header'>
              Chỉnh sửa bài viết    
            </div>
            <Share modify={true} postModify={post} close={close} />
          </div>
        )}
      </Popup>
    </>
  );
}
