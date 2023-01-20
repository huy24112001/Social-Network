import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import React, {useContext, useEffect, useState} from "react";
import Context from "../../store/context";
import {useLocation} from "react-router-dom";
import {
    getListFriend,
    inviteFriend,
    removeFriend,
    removeInviteFriend,
    statusFriendUser
} from "../../service/authenService";
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
import axios from "axios";
import { useParams } from "react-router";
import noAvatar from "../../img/person/noAvatar.png"
import noCover from "../../img/person/noBackground.jpg"
import service from "../../service";

export default function Profile() {
    const [state,dispatch] = useContext(Context)
    const location = useLocation()
    const profile = location?.state?.profile;
    const [profileState, setProfileState] = useState(profile ? profile : null)
    // const statusFriend = location.state.statusFriend
    const [statusFriend,setStatusFriend] = useState()
    const [showEditProfile,setShowEditProfile] = useState(false)
    const [listFriend,setListFriend] = useState([])
    const {userId} = useParams()
    console.log(userId)

    useEffect( async () => {
      const resProfile = await service.authenService.getUserInfo({userId})
    //   window.location.reload(false);
        console.log("reload")
        window.scrollTo(0, 0)
      setProfileState(resProfile)
    }, [userId])

    useEffect(async () => {
        if (profileState){
            if(state.infoUser._id !== profileState._id) {
                const rsStatusFriend = await statusFriendUser({user_id: state.infoUser._id, user_query_id: profileState._id});
                console.log(rsStatusFriend.result)
                setStatusFriend(rsStatusFriend.result)
            }
            else
                setStatusFriend(-1)
        }
    },[profileState])

    useEffect(async () => {
        if (profileState){
           const rs = await getListFriend({user_info : profileState})
            setListFriend(rs.result)
        }
    },[profileState])





    async function handleRequestFriend() {

        if (statusFriend === 1) {
            const rs = await removeInviteFriend({user_id: state.infoUser._id, user_query_id: profileState._id , status : statusFriend})
            // console.log(rs.result)
            if (rs.result === 0 ) setStatusFriend(0);

        } else if (statusFriend === 3) {

            const rs = await removeFriend({user_id: state.infoUser._id, user_query_id: profileState._id,status : statusFriend})
            if (rs.result === 0) setStatusFriend(0)

        } else if (statusFriend === 0) {
            const rs = await inviteFriend({user_id: state.infoUser._id, user_query_id: profileState._id})
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
            {profileState ? (
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
                        <TextField margin="normal" variant="standard" id="Sống tại" label="Sống tại" type="text"
                                   fullWidth
                                   // onChange={(e) => setUsername(e.target.value)} value={username}
                                   inputProps={{ minLength: 2 }}
                                   required
                        />
                        <TextField margin="normal" variant="standard" id="Đến từ" label="Đến từ" type="text"
                                   fullWidth
                                   // onChange={(e) => setEmail(e.target.value)} value={email}
                                   required
                        />
                        <TextField margin="normal" variant="standard" id="Đã học tại" label="Đã học tại"
                                   type="text" fullWidth
                                   // onChange={(e) => setPassword(e.target.value)} value={password}
                                   required/>
                        <TextField margin="normal" variant="standard" id="Mối quan hệ" label="Mối quan hệ"
                                   type="text" fullWidth
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
                                src={profileState.coverPicture}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={profileState.profilePicture === '' ? noAvatar : profileState.profilePicture }
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{profileState.username}</h4>
                            <span className="profileInfoDesc">Hello my friends!</span>
                        </div>

                            <button className="friendBtn" onClick={handleRequestFriend}>{
                                statusFriend === 3 ? 'Bạn bè' :
                                    statusFriend === 1 ? 'Đã gửi lời mời kết bạn' :
                                        statusFriend !== -1 ? 'Thêm bạn bè' : 'Chỉnh sửa thông tin cá nhân'
                            }</button>

                    </div>
                    <div className="profileRightBottom">
                        <Rightbar profile = {profileState} listFriend = {listFriend} />
                        <Feed userId={userId} />

                    </div>
                </div>
            </div>

            </>
            ) : null
            }
        </>
    );

}
