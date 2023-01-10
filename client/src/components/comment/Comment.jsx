import { Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
// import formatDistanceToNow from "date-fns/formatDistanceToNow";
import noAvatar from "../../img/person/noAvatar.png"

export default function Comment({ comment }) {
  return (
    <Box
      padding="1rem"
      sx={{
        "&:hover": {
          backgroundColor: "#eee",
        },
      }}
    >
      <Grid container flexWrap="nowrap">
        <Grid item sx={{ paddingRight: "1rem" }}>
          <img src={noAvatar} alt="lgoog" width="50px" />
        </Grid>
        <Grid item flexGrow="1">
          <Box>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              flexWrap="nowrap"
            >
              <Grid item>
                <Box display="flex">
                  <Typography
                    sx={{ fontSize: "16px", fontWeight: 500, mr: "6px" }}
                  >
                    {comment.userId}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                  >
                    {/* @{comment.author.handle} */}
                    "ABC"
                  </Typography>
                  <Typography
                    sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                  >
                    .
                  </Typography>
                  <Typography
                    sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                  >
                    {/* {formatDistanceToNow(new Date(comment.createdAt))}{" "} */}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "15px", color: "#555" }}>
                    {comment.content}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <IconButton>
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
                        <li>Ẩn bình luận</li>
                        <li>Ẩn bình luận</li>
                    </div>
                  </Popup>
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}