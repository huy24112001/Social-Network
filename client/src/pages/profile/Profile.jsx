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
    statusFriendUser, updateProfileServer
} from "../../service/authenService";
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl, FormControlLabel, FormLabel,
    IconButton, Radio, RadioGroup,
    TextField
} from "@mui/material";
import {Close, Send} from "@mui/icons-material";
import axios from "axios";
import { useParams } from "react-router";
import noAvatar from "../../img/person/noAvatar.png"
import noCover from "../../img/person/noBackground.jpg"
import service from "../../service";
import {Cancel, PermMedia} from "@material-ui/icons";

export default function Profile() {

    const [state,dispatch] = useContext(Context)
    const socket = state.socket
    const location = useLocation()
    const profile = location?.state?.profile;
    const [profileState, setProfileState] = useState(profile ? profile : null)

    // const statusFriend = location.state.statusFriend
    const [statusFriend,setStatusFriend] = useState()
    const [listFriend,setListFriend] = useState([])

    const [showEditProfile,setShowEditProfile] = useState(false)
    const [updateProfile,setUpdateProfile] = useState({from : '', city : '',relationship : Number,study : '', profilePicture : ''})
    const {userId} = useParams()
    // console.log(userId)

    const [file, setFile] = useState(null);

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

            const rs = await getListFriend({user_info: profileState.friends})
            setListFriend(rs.result)
        }
    },[profileState])





    async function handleRequestFriend() {

        if (statusFriend === 1) {
            const rs = await removeInviteFriend({user_id: state.infoUser._id, user_query_id: profileState._id , status : statusFriend})
            // console.log(rs.result)
            if (rs.result === 0 ) setStatusFriend(0);

        } else if (statusFriend === 3) {
            socket.emit('removeFriend',{
                user_req: state.infoUser._id, user_rec: profileState._id
            })

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

    function handleUpdateProfile() {
        const rs = updateProfileServer({update_Profile : updateProfile, idProfile : profileState._id})
        // dispatch({type : 'SET_USER', payload : {...rs.result} })
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };


    const handleFile = async (e) => {
        e.preventDefault();
        let filename = ''
        const encodedString = await convertToBase64(e.target.files[0])
        // console.log(encodedString)
        setFile(e.target.files[0])
        // setPost(encodedString)
        setUpdateProfile({...updateProfile, profilePicture : encodedString})
    }

    return (
        <>
            {profileState ? (
                <>
                    <Dialog  onClose={()=> setShowEditProfile(false)} open={showEditProfile}>
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

                        <form onSubmit={handleUpdateProfile}>
                            <DialogContent   >
                                <DialogContentText>
                                    Chỉnh sửa các thông tin sau đây:
                                </DialogContentText>
                                {file ?    (
                                    <div className="shareImgContainer">
                                        <img style={{width:'40%',marginLeft:120,marginTop:20}}  src={URL.createObjectURL(file)} alt="" />
                                        <Cancel className="shareCancelImg" onClick={() => {
                                            setFile(null)
                                            // setPost( "")
                                            setUpdateProfile({...updateProfile, profilePicture: ''})
                                        }} />
                                    </div>
                                ) :  <div style={{alignContent:'center',justifyContent:'center'}}><img style={{width:'40%',marginLeft:120,marginTop:20}} src={profileState.profilePicture === '' ? noAvatar : profileState.profilePicture} alt="" /></div>
                                }
                                <label className="shareOption">
                                    <span style={{fontSize:14,color:'blue',marginLeft:135,marginTop:10,marginBottom:10}}>{profileState.profilePicture === '' ? 'Thêm Ảnh Đại diện' : 'Thay đổi ảnh đại diện'}</span>
                                    <input
                                        style={{ display: "none" }}
                                        type="file"
                                        id="file"
                                        accept=".png,.jpeg,.jpg"
                                        onChange={(e) => handleFile(e)}
                                    />
                                </label>
                                <TextField margin="normal" variant="standard" id="Sống tại" label="Sống tại" type="text"
                                           fullWidth
                                           onChange={(e) => setUpdateProfile({from :updateProfile.from , city : e.target.value ,
                                               relationship : updateProfile.relationship,study : updateProfile.study, profilePicture: updateProfile.profilePicture})}
                                           value={updateProfile.city}
                                           inputProps={{ minLength: 2 }}
                                           required
                                />
                                <TextField margin="normal" variant="standard" id="Đến từ" label="Đến từ" type="text"
                                           fullWidth
                                           onChange={(e) => setUpdateProfile({from : e.target.value, city : updateProfile.city,
                                               relationship : updateProfile.relationship,study : updateProfile.study,profilePicture: updateProfile.profilePicture})}
                                           value={updateProfile.from}
                                           required
                                />
                                <TextField margin="normal" variant="standard" id="Đã học tại" label="Đã học tại"
                                           type="text" fullWidth
                                           onChange={(e) => setUpdateProfile({from : updateProfile.from, city : updateProfile.city,
                                               relationship : updateProfile.relationship,study :e.target.value,profilePicture: updateProfile.profilePicture })}
                                           value={updateProfile.study}
                                           required/>

                                <FormControl style={{marginTop:5}}>
                                    <FormLabel id="Mối quan hệ">Mối quan hệ</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="Mối quan hệ"
                                        defaultValue="female"
                                        name="radio-buttons-group" row={true}
                                        value={updateProfile.relationship}
                                        onChange={(e) => setUpdateProfile({from : updateProfile.from, city : updateProfile.city,
                                            relationship : e.target.value,study :updateProfile.study,profilePicture: updateProfile.profilePicture })}
                                    >
                                        <FormControlLabel value={3} control={<Radio />} label="Độc thân" />
                                        <FormControlLabel value={2} control={<Radio />} label="Đang hẹn hò" />
                                        <FormControlLabel value={1} control={<Radio />} label="Khác" />
                                    </RadioGroup>
                                </FormControl>
                            </DialogContent>
                            <DialogActions sx={{ px: '19px',marginTop:3 }}>
                                <Button   type="submit" variant="contained" endIcon={<Send />}>
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
