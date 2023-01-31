import { Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import noAvatar from "../../img/person/noAvatar.png"
import { useNavigate } from "react-router-dom";
import "./comment.css"
import likeImg from "../../img/like.png"
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Context from "../../store/context";
import getTimeAgo from "../../time/GetTimeAgo";

export default function Comment({ comment }) {

  const [like, setLike] = useState(comment?.likes?.length)
  const [state , dispatch] = useContext(Context)
  const socket = state.socket
  const infoUser = state.infoUser

  let [isLikedComment, setLikeComment] = useState(comment?.likes.some(userId => userId === infoUser._id));
  const [display, setDisplay] = useState(true)
  const timestamp = comment.createdAt ? new Date(comment.createdAt) : '';
  const navigate = useNavigate()

  const handleClickComment = () => {
    navigate(`/profile/${comment.user._id}`)
    // console.log(comment.user)
  }

  useEffect(() => {
    if (socket){
      socket.once('getLikeComment', (data) => {
        if(data.comment === comment._id){
          setLike(data.isLikedComment ? like+1 : like-1)
          console.log(data)
        }
      })
    }

  }, [socket, like])

  const handleOnClickLikeComment = () => {
    isLikedComment ? setLikeComment(false) : setLikeComment(true);
    setLike(isLikedComment ? like-1 : like+1)
    socket.emit("likeComment", {
      comment: comment._id,
      isLikedComment: !isLikedComment,
      user: infoUser._id
    })
   
  }

  const handleOnClickResponeComment = () => {
    // do something
    console.log(comment);
  }

  return (
    <>
    <Box
      padding="0.5rem 2rem 0.5rem 1rem"
      marginTop="10px"
      // sx={{
      //   "&:hover": {
      //     backgroundColor: "#f0f2f5",
      //   },
      // }}
    >
      <Grid container flexWrap="nowrap">
        <Grid item sx={{ paddingRight: "7px" }}>
          <img src={comment?.user?.profilePicture === '' ? noAvatar : comment?.user?.profilePicture} className="avatar-comment" alt="lgoog" />
        </Grid>
        <Grid item flexGrow="1">
          <Box>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              flexWrap="nowrap"
              width="fit-content"
            >
              {
                display ? (

                <Grid item 
                      borderRadius="10px"
                      backgroundColor="#dbf8ff"
                      padding="0.5rem"
                  
                
                >
                  <Box display="flex">
                    <Typography
                      sx={{ fontSize: "16px", fontWeight: 600, mr: "6px", cursor: "pointer" }}
                      onClick={handleClickComment}
                    >
                      {comment.user.username}
                    </Typography>
                    {/* <Typography
                      sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                    >
                      @{comment.author.handle}
                      "ABC"
                    </Typography>
                    <Typography
                      sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                    >
                      .
                    </Typography> */}
                    <Typography
                      sx={{ fontSize: "15px", mr: "6px", color: "#555",marginTop:'1px'  }}
                    >
                      {/* {formatDistance(Date.now(), timestamp, {addSuffix: true})}{" "} */}
                      {getTimeAgo(timestamp)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: "15px", color: "#555", whiteSpace: 'pre-wrap'}}>
                      {comment.content}
                    </Typography>
                  </Box>
                </Grid>
                ) : (
                  <p>Bạn đã ẩn bình luận này</p>
                )
              }
              <Grid item>
                {/* <IconButton> */}
                  {/* <MoreHorizIcon /> */}
                  <Popup
                    trigger={
                      <IconButton>
                        <MoreHorizIcon />
                      </IconButton>
                    }
                    position="right center"

                  >
                    {close => (<div className={'popup'}>
                  <div className="popupList">
                    {
                      (comment?.user?._id === infoUser._id ) ? (
                        <li className="popupItem" onClick={() => {
                          close()
                        }}>
                          <ModeEditOutlinedIcon style={{marginRight: 5}}/>
                          Chỉnh sửa bình luận
                        </li>
                      ) : null
                    }
                    <li className="popupItem" onClick={() => {
                      close()
                    }}>
                      <NotificationsOffOutlinedIcon style={{marginRight: 5}}/>
                      Tắt thông báo về bình luận này
                    </li>
                    {
                      (comment?.user?._id === infoUser._id )
                      ?  (
                        display ? (
                          <li className="popupItem" onClick={() => {
                            // handleDeletePost()
                            setDisplay(false)
                            close()
                          }}>
                            <DeleteForeverOutlinedIcon style={{marginRight: 5}}/> 
                            Xóa bình luận
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
                            Ẩn bình luận
                          </li>
                        ) : (
                          <li className="popupItem" onClick={() => {
                            setDisplay(true)
                            close()
                          }}>
                            <CancelOutlinedIcon style={{marginRight: 5}}/> 
                            Hiện bình luận
                          </li>
                        )
                      )
                    }
                    
                  </div>
                </div>)}
                  </Popup>
                {/* </IconButton> */}
              </Grid>
            </Grid>
          </Box>
          {
            display ? (
              <>
                { 
                  isLikedComment ? 
                    <span className="liked-comment" onClick={handleOnClickLikeComment}>Like </span> :
                    <span className="not-like-comment" onClick={handleOnClickLikeComment}>Like </span> 
                }

                  <span className="respone-comment" onClick={handleOnClickResponeComment}>Respone </span>
                  <Box>
                    <img className="likeIconComment" src={likeImg} alt="" />
                    {/* <img className="likeIconComment" src={heartImg} onClick={handleOnClickLikeComment} alt="" /> */}
                    <span className="postLikeCounter">{like}</span>

                  </Box>
              </>
            ) : null
          }
        </Grid>
      </Grid>
    </Box>

    </>
  );

}

