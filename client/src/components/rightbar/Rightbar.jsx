import "./rightbar.css";
import { Users } from "../../constant/dummyData";
import Online from "../online/Online";
import {useContext} from "react";
import Context from "../../store/context";

export default function Rightbar({profile}) {


  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
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
            <span className="rightbarInfoKey">Sống tại</span>
            <span className="rightbarInfoValue">{profile.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Đến từ</span>
            <span className="rightbarInfoValue">{profile.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Đã học tại</span>
            <span className="rightbarInfoValue">{profile.study}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Mối quan hệ</span>
            <span className="rightbarInfoValue">{profile.relationship === 1 ? "Độc thân" :
                profile.relationship === 2 ? "Hẹn hò" : "Không có thông tin"  }</span>
          </div>
        </div>
      </div>
          <div className='leftBar'>
        <h4 className="rightbarTitle">Bạn Bè</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src="assets/person/1.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/2.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/3.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/4.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/5.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/6.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
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
