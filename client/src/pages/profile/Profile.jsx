import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import React, {useContext, useEffect, useState} from "react";
import Context from "../../store/context";
import {useLocation} from "react-router-dom";
import {inviteFriend, removeFriend, removeInviteFriend, statusFriendUser} from "../../service/authenService";
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField
} from "@mui/material";
import {Close, Send} from "@mui/icons-material";

export default function Profile() {
    const [state,dispatch] = useContext(Context)
    const location = useLocation()
    const profile = location.state.profile;
    // const statusFriend = location.state.statusFriend
    const [statusFriend,setStatusFriend] = useState()
    const [showEditProfile,setShowEditProfile] = useState(false)

    useEffect(async () => {
        if(state.infoUser._id !== profile._id) {
            const rsStatusFriend = await statusFriendUser({user_id: state.infoUser._id, user_query_id: profile._id});
            setStatusFriend(rsStatusFriend.result)
        }
        else
            setStatusFriend(-1)
    },[profile])

    async function handleRequestFriend() {

        if (statusFriend === 1) {
            const rs = await removeInviteFriend({user_id: state.infoUser._id, user_query_id: profile._id})
            // console.log(rs.result)
            if (rs.result === 0 ) setStatusFriend(0);

        } else if (statusFriend === 3) {

            const rs = await removeFriend({user_id: state.infoUser._id, user_query_id: profile._id})
            if (rs) setStatusFriend(0)

        } else if (statusFriend === 0) {
            const rs = await inviteFriend({user_id: state.infoUser._id, user_query_id: profile._id})
            // console.log(rs.result)
            if (rs.result === 1) setStatusFriend(1)
        }
        else {
            setShowEditProfile(true);
        }

    }

    function updateProfile() {

    }

    return (
        <>
            <Dialog   onClose={()=> setShowEditProfile(false)} open={showEditProfile}>
                <DialogTitle >
                    Thông tin cá nhân
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                        onClick={ ()=> setShowEditProfile(false)}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>

                <form onSubmit={updateProfile}>
                    <DialogContent dividers>
                        <DialogContentText>
                            Chỉnh sửa các thông tin sau đây:
                        </DialogContentText>
                        <TextField margin="normal" variant="standard" id="username" label="Username" type="text"
                                   fullWidth
                                   // onChange={(e) => setUsername(e.target.value)} value={username}
                                   inputProps={{ minLength: 2 }}
                                   required
                        />
                        <TextField margin="normal" variant="standard" id="email" label="Email" type="email"
                                   fullWidth
                                   // onChange={(e) => setEmail(e.target.value)} value={email}
                                   required
                        />
                        <TextField margin="normal" variant="standard" id="password" label="Password"
                                   type="password" fullWidth
                                   // onChange={(e) => setPassword(e.target.value)} value={password}
                                   required/>
                    </DialogContent>
                    <DialogActions sx={{ px: '19px',marginTop:3 }}>
                        <Button  type="submit" variant="contained" endIcon={<Send />}>
                            Cật Nhật
                        </Button>
                    </DialogActions>
                </form>
                <DialogActions sx={{ justifyContent: 'center', py: '24px' }}>

                </DialogActions>
            </Dialog>





            <Topbar />
            <div className="profile">
                {/*<Sidebar />*/}

                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src="../assets/post/3.jpeg"
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src="../assets/person/7.jpeg"
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{profile.username}</h4>
                            <span className="profileInfoDesc">Hello my friends!</span>
                        </div>
                        {
                            console.log(statusFriend + ' huy')
                        }


                            <button className="friendBtn" onClick={handleRequestFriend}>{
                                statusFriend === 3 ? 'Bạn bè' :
                                    statusFriend === 1 ? 'Đã gửi lời mời kết bạn' :
                                        statusFriend === 0 ? 'Thêm bạn bè' : 'Chỉnh sửa thông tin cá nhân'
                            }</button>

                    </div>
                    <div className="profileRightBottom">
                        <Rightbar profile = {profile} />
                        <Feed />

                    </div>
                </div>
            </div>
        </>
    );

}
