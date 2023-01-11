import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import {useContext, useEffect} from "react";
import Context from "../../store/context";
import axios from "axios";
import { useParams } from "react-router";
import noAvatar from "../../img/person/noAvatar.png"
import noCover from "../../img/person/noBackground.jpg"

export default function Profile() {

  const [state , dispatch] = useContext(Context)
  const userId = useParams().userId;
  const infoUser = state.infoUser

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await axios.get(`/users?username=${username}`);
  //     setUser(res.data);
  //   };
  //   fetchUser();
  // }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        {/*<Sidebar />*/}

        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={!(infoUser.coverPicture === "") ? infoUser.coverPicture : noCover}
                alt=""
              />
              <img
                className="profileUserImg"
                src={!(infoUser.profilePicture === "") ? infoUser.profilePicture : noAvatar}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{state.infoUser.username}</h4>
                <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Rightbar profile />
            <Feed userId={infoUser._id} />

          </div>
        </div>
      </div>
    </>
  );
}
