import { Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, {useContext, useState} from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import noAvatar from "../../img/person/noAvatar.png"
import { useNavigate } from "react-router-dom";
import "./comment.css"
import likeImg from "../../img/like.png"
import heartImg from "../../img/heart.png"
import getTimeAgo from "../../time/GetTimeAgo";
import Context from "../../store/context";

export default function Comment({ comment }) {

  const [like, setLike] = useState(comment?.likes?.length)
  const [state , dispatch] = useContext(Context)
  const socket = state.socket
  const infoUser = state.infoUser

  let [isLikedComment, setLikeComment] = useState(false);
  const timestamp = comment.createdAt ? new Date(comment.createdAt) : '';
  const navigate = useNavigate()

  const handleClickComment = () => {
    navigate(`/profile/${comment.user._id}`)
    // console.log(comment.user)
  }

  const handleOnClickLikeComment = () => {
    isLikedComment ? setLikeComment(false) : setLikeComment(true);
    setLike(isLikedComment ? like-1 : like+1)


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
          <img src={comment.user.profilePicture == '' ? noAvatar : comment.user.profilePicture } className="avatar-comment" alt="avatar" />
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
              <Grid item
                    borderRadius="10px"
                    backgroundColor="#f0f2f5"
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
                  <Typography sx={{ fontSize: "15px", mr: "16px", color: "#555",marginTop:'1px' }}>
                    {/*{formatDistance(Date.now(), timestamp, {addSuffix: true, locale: vi})}{" "}*/}
                    {getTimeAgo(timestamp)}

                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "15px", color: "#555"}}>
                    {comment.content}
                  </Typography>
                </Box>
              </Grid>
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
                    <div className={'popup'}>
                      <div className="popupList">
                        <li className="popupItem">
                          Xóa bình luận
                        </li>
                        <li className="popupItem">
                          Ẩn bình luận
                        </li>
                        <li className="popupItem">
                          Báo cáo bình luận
                        </li>

                      </div>
                    </div>
                  </Popup>
                {/* </IconButton> */}
              </Grid>
            </Grid>
          </Box>
        <>
          {
            isLikedComment ?
              <span className="liked-comment" onClick={handleOnClickLikeComment}>Thích</span> :
              <span className="not-like-comment" onClick={handleOnClickLikeComment}>Thích</span>
          }

            <span className="respone-comment" onClick={handleOnClickResponeComment}>Phản hồi</span>

            <Box style={{display:'flex', flexDirection:'row' ,marginLeft:'6px', marginTop:'5px'}}>
              <img className="likeIcon" src={likeImg} alt="" />
              {/* <img className="likeIcon" src={heartImg} onClick={handleOnClickLikeComment} alt="" /> */}
              <span className="postLikeCounter">{like}</span>

            </Box>
        </>
        </Grid>
      </Grid>
    </Box>

    </>
  );

}

