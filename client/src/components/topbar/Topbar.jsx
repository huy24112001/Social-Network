import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import {useContext, useState} from "react";
import {searchUser} from "../../service/authenService";
import Context from "../../store/context";
import { IconButton } from "@mui/material";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function Topbar() {
  const [textSearch,setTextSearch] = useState('');
  const [state , dispatch] = useContext(Context)
  const infoUser = state.infoUser

  async function handleSearch() {

    const rs = await searchUser({username: textSearch})
    if (rs.result) console.log('thanh cong');
    else
    console.log(rs.result.length);  
  }

  const [friendRequestNoti, setFriendRequestNoti] = useState(true)
  const [messageNoti, setMessageNoti] = useState(true)
  const [notification, setNotification] = useState(true)

  const handleSignOut = () => {
    dispatch({type: 'SIGN_OUT'})
  }

  const handleFriendNoti = () => {
    setFriendRequestNoti(false)
  }
  
  return (
      <div className="topbarContainer" >
        <div className="topbarLeft" >
          <a href ="/" style={{textDecoration: "none"}}>
            <span className="logo">Social</span>
          </a>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
                placeholder="Search for friend, post or video"
                className="searchInput"
            />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem" onClick={handleFriendNoti}>
              <Person />
              {
                friendRequestNoti ? 
                <span className="topbarIconBadge">1</span> : 
                null
              }
            </div>
                          
            <div className="topbarIconItem" onClick={() => setMessageNoti(false)}>
              <Chat />
              {messageNoti ? <span className="topbarIconBadge">2</span> : null}
            </div>
            <div className="topbarIconItem" onClick={() => setNotification(false)}>
              <Notifications />
              {notification ? <span className="topbarIconBadge">1</span> : null}
            </div>
          </div>


          <div className="user">
            <img
                src="/assets/person/1.jpeg" alt="" className="imgNav"/>
            <span style={{position: "relative"}} className="name">{state.infoUser.username}</span>
            <ul className="menu">
              <li className="itemMenu"><a href={`/profile/${infoUser._id}`} style={{color : "#070707",textDecoration: "none",cursor : "pointer"}}>Trang cá nhân</a></li>
              <li className="itemMenu"><a href="/" style={{color : "#131313",textDecoration: "none"}} onClick={handleSignOut}>Đăng xuất</a></li>
            </ul>
          </div>

        </div>
      </div>

  );
}
