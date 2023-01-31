import "./rightbar.css";
import { Users } from "../../constant/dummyData";
import Online from "../online/Online";
import {useContext, useEffect, useState} from "react";
import Context from "../../store/context";
import noAvatar from "../../img/person/noAvatar.png";
import {Favorite, House, LocationOn, School} from "@material-ui/icons";
import service from "../../service";

export default function Rightbar({profile,listFriend}) {
  const [state, dispatch] = useContext(Context)

  // console.log(state)
  const socket = state.socket
  const infoUser = state.infoUser
  const [onlineUsers, setOnlineUsers] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [friends, setFriends] = useState([]);


  useEffect(() => {
    if(socket){
      socket.emit('addUser', infoUser._id)
      console.log("connected")
      socket.on("getUsers", (users) => {
        setOnlineUsers(
            infoUser.friends.filter((f) => users.some((u) => u.userId === f))
        );
        console.log(users)
      });
    }
  }, [socket, infoUser])

  useEffect(() => {
    const getFriends = async () => {
      const result = await service.userService.getFollowings(infoUser?._id)
      console.log(result)
      setFriends(result);
    };
    getFriends();
    // return () => {
    //     setFriends([]);
    //   };
  }, [infoUser]);

  useEffect(() => {
    setOnlineFriends(friends?.filter((f) => onlineUsers?.includes(f._id)));
    // setOnlineFriends(onlineUsers);
    // console.log(onlineUsers)
    // return () => {
    //     setOnlineFriends([]);
    //   };


  }, [friends, onlineUsers]);
  const HomeRightbar = () => {
    return (
        <>
          <div className="birthdayContainer">
            <img className="birthdayImg" src="assets/gift.png" alt="" />
            <span className="birthdayText">
            <b>Bạn</b> và <b>3 người bạn khác</b> có sinh nhật vào hôm nay.
          </span>
          </div>
          <img className="rightbarAd" src="assets/ad.png" alt="" />
          <h4 className="rightbarTitle">Đang hoạt động</h4>
          <ul className="rightbarFriendList">
            {onlineFriends?.map((u) => (
                <Online key={u._id} user={u} />
            ))}
          </ul>
        </>
    );
  };

  const ProfileRightbar = () => {

    return (
        <>
          <div className='leftBar'>
            <h4 className="rightbarTitle">Giới thiệu</h4>
            <div className="rightbarInfo">
              <div className="rightbarInfoItem">
                <House className="rightBarIcon"/>
                <span className="rightbarInfoKey">Sống tại</span>
                <span className="rightbarInfoValue">{profile?.city}</span>
              </div>
              <div className="rightbarInfoItem">
                <LocationOn className="rightBarIcon"/>
                <span className="rightbarInfoKey">Đến từ</span>
                <span className="rightbarInfoValue">{profile?.from}</span>
              </div>
              <div className="rightbarInfoItem">
                <School className="rightBarIcon"/>
                <span className="rightbarInfoKey">Đã học tại</span>
                <span className="rightbarInfoValue">{profile?.study}</span>
              </div>
              <div className="rightbarInfoItem">
                <Favorite className="rightBarIcon"/>
                <span className="rightbarInfoKey">Mối quan hệ</span>
                <span className="rightbarInfoValue">{profile?.relationship === 3 ? "Độc thân" :
                    profile?.relationship === 2 ? " Đang hẹn hò" : "Chưa cật nhật thông tin"  }</span>
              </div>
            </div>
          </div>
          <div className='leftBar'>
            <h4 className="rightbarTitle">Bạn Bè</h4>
            <p style={{color:'black', marginBottom:10}}>{`${profile?.friends?.length} người bạn`}</p>
            <div className="rightbarFollowings">

              {
                  listFriend && listFriend?.map((value,index) =>{
                    console.log(value)
                    return   <div className="rightbarFollowing" key={index}>
                      <img
                          src={value?.profilePicture === "" ? noAvatar : value?.profilePicture}
                          alt="Avatar"
                          className="rightbarFollowingImg"
                      />
                      <span className="rightbarFollowingName">{value?.username}</span>
                    </div>

                  })
              }
            </div>
          </div>
        </>
    );
  };
  return (
      <div className="rightbar">
        <div className="rightbarWrapper">
          {profile ? <ProfileRightbar /> : <HomeRightbar />}
        </div>
      </div>
  );
}
