import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import {useContext, useEffect, useState} from "react";
import {searchUser, statusFriendUser} from "../../service/authenService";

import Context from "../../store/context";
import {useNavigate} from "react-router-dom";

export default function Topbar() {
  const [textSearch,setTextSearch] = useState('');
  const [rsFriend,setRsFriend] = useState(false);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const [state , dispatch] = useContext(Context)
  const navigate = useNavigate()


  useEffect( async ()=>{
    const rs = await searchUser({username: textSearch})
    // console.log(rs.result)
    if(textSearch === '') {
      setResults([])
    }
    else
    setResults(rs.result);
  }, [textSearch])

  useEffect(() => {
    if (results.length > 0 && !showResults ) setShowResults(true);

    if (results.length <= 0 || textSearch === '') setShowResults(false);
  }, [results,textSearch]);

  function getFriendArr(index){

  }


  const handleSignOut = () => {
    navigate('/')
    dispatch({type: 'SIGN_OUT'})
  }


  return (
      <div className="topbarContainer" >
        <div className="topbarLeft" >
          <div onClick={()=> navigate('/home')} style={{textDecoration: "none"}}>
            <span className="logo">Home</span>
          </div>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input placeholder="Tìm kiếm bạn bè"
                className="searchInput" value={textSearch} onChange={(e)=>setTextSearch(e.target.value)}/>

            {showResults && (
                <div className="resultSearch">
                  {results.map((item, index) => {
                    return (
                        <div
                            key={index}
                            onMouseDown={async () => {

                              navigate(`/profile/${results[index]._id}`, {state: {profile: results[index]  }})
                            }}
                            className="itemSearch">
                          <Search className="searchIcon" />
                          <p style={{marginLeft:10}}>{item.username}</p>
                        </div>
                    );
                  })}
                </div>
            )   }
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
              <li className="itemMenu" style={{cursor:'pointer'}}><div onClick={()=> navigate(`/profile/${state.infoUser._id}`,{state: {profile : state.infoUser }})}  style={{color : "#070707",textDecoration: "none",cursol : "pointer"}}>Trang cá nhân</div></li>
              <li className="itemMenu" style={{cursor:'pointer'}}><div style={{color : "#131313",textDecoration: "none"}} onClick={handleSignOut}>Đăng xuất</div></li>
            </ul>
          </div>

        </div>
      </div>

  );
}
