import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import {useContext, useState} from "react";
import {searchUser} from "../../service/authenService";
import Select from "react-select/base";
import Context from "../../store/context";
export default function Topbar() {
  const [textSearch,setTextSearch] = useState('');
  const [state , dispatch] = useContext(Context)

  async function handleSearch() {

    const rs = await searchUser({username: textSearch})
    if (rs.result) console.log('thanh cong');
    else
    console.log(rs.result.length);

  }

  return (
      <div className="topbarContainer" >
        <div className="topbarLeft" >
          <a href ="/home" style={{textDecoration: "none"}}>
            <span className="logo"></span>
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
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>


          <div className="user">
            <img
                src="/assets/person/1.jpeg" alt="" className="imgNav"/>
            <span style={{position: "relative"}} className="name">{state.infoUser.username}</span>
            <ul className="menu">
              <li className="itemMenu"><a href="/profile" style={{color : "#070707",textDecoration: "none",cursol : "pointer"}}>Trang cá nhân</a></li>
              <li className="itemMenu"><a href="/" style={{color : "#131313",textDecoration: "none"}}>Đăng xuất</a></li>
            </ul>
          </div>

        </div>
      </div>

  );
}
