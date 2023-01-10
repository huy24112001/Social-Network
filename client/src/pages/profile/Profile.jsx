import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import {useContext, useEffect} from "react";
import Context from "../../store/context";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {

  const [state , dispatch] = useContext(Context)
  const userId = useParams().userId;
  const user = state.infoUser

  

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
                src="assets/post/3.jpeg"
                alt=""
              />
              <img
                className="profileUserImg"
                src="assets/person/7.jpeg"
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
            <Feed />

          </div>
        </div>
      </div>
    </>
  );
}
