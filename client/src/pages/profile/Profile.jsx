import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import {useContext, useEffect} from "react";
import Context from "../../store/context";
import {Image} from "@mui/icons-material";
import {useLocation} from "react-router-dom";

export default function Profile() {

    const location = useLocation()
    const profile = location.state.profile;

    function handleFriend(){

    }

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
                        <button className="friendBtn" onClick={handleFriend}>Thêm bạn bè</button>
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
