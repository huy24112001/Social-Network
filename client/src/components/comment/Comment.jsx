import { Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { formatDistance} from 'date-fns';
import noAvatar from "../../img/person/noAvatar.png"
import { useNavigate } from "react-router-dom";
import "./comment.css"

export default function Comment({ comment }) {

  let [isLikedComment, setLikeComment] = useState(false);
  const timestamp = comment.createdAt ? new Date(comment.createdAt) : '';
  const navigate = useNavigate()

  const handleClickComment = () => {
    navigate(`/profile/${comment.user._id}`)
    // console.log(comment.user)
  }

  const handleOnClickLikeComment = () => {
    isLikedComment ? setLikeComment(false) : setLikeComment(true);
   
  }
  
  const handleOnClickResponeComment = () => {
    // do something
  }

  return (
    <>
    
    <Box
      padding="1rem 2rem 0.5rem 1rem"
      marginTop="15px"
      sx={{
        "&:hover": {
          backgroundColor: "#eee",
        },
      }}
    >
      <Grid container flexWrap="nowrap">
        <Grid item sx={{ paddingRight: "1rem" }}>
          <img src="../../assets/person/1.jpeg" className="avatar-comment" alt="lgoog" />
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
                    backgroundColor="#dbf8ff"
                    padding="0.5rem"
                
              
              >
                <Box display="flex">
                  <Typography
                    sx={{ fontSize: "16px", fontWeight: 500, mr: "6px", cursor: "pointer" }}
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
                    sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                  >
                    {formatDistance(Date.now(), timestamp, {addSuffix: true})}{" "}
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
        <>{ isLikedComment ? <span className="liked-comment" onClick={handleOnClickLikeComment}>Like </span> :
            <span className="not-like-comment" onClick={handleOnClickLikeComment}>Like </span> }

            <span className="respone-comment" onClick={handleOnClickResponeComment}>Respone </span>
        </>
        </Grid>
      </Grid>
    </Box>
    
    </>
  );

}

