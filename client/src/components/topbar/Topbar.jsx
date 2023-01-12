import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import {useContext, useState} from "react";
import {searchUser} from "../../service/authenService";
import Select from "react-select/base";
import Context from "../../store/context";
import {useNavigate, useNavigation} from "react-router-dom";
export default function Topbar() {
  const [textSearch,setTextSearch] = useState('');
  const [rsFriend,setRsFriend] = useState(false);
  const [state , dispatch] = useContext(Context)
  const navigate = useNavigate()


  async function handleSearch() {

    const rs = await searchUser({username: textSearch})
    if (rs.result)
      setRsFriend(true)
      // navigate(`/profile/${rs.result[0]._id}`, {state: { profile :  rs.result[0] }}  )


    // console.log(rs.result);

  }

  const handleSignOut = () => {
    navigate('/')
    dispatch({type: 'SIGN_OUT'})
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
                placeholder="Tìm kiếm bạn bè"
                className="searchInput" value={textSearch} onChange={(e)=>setTextSearch(e.target.value)}
            />
            { rsFriend ? <div className="menu"><p>huy</p></div> : null}
            <button onClick={handleSearch}>Tìm kiếm</button>
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
              <li className="itemMenu" style={{cursor:'pointer'}}><div onClick={()=> navigate(`/profile/${state.infoUser._id}`,{state: {profile : state.infoUser}})}  style={{color : "#070707",textDecoration: "none",cursol : "pointer"}}>Trang cá nhân</div></li>
              <li className="itemMenu" style={{cursor:'pointer'}}><div style={{color : "#131313",textDecoration: "none"}} onClick={handleSignOut}>Đăng xuất</div></li>
            </ul>
          </div>

        </div>
      </div>

  );
}
