import "./topbar.css";
import {Search, Person, Chat, Notifications, Image} from "@material-ui/icons";
import {useContext, useEffect, useState} from "react";
import {AcceptFriend, checkInviteFriend, searchUser, statusFriendUser} from "../../service/authenService";

import Context from "../../store/context";
import { IconButton } from "@mui/material";
import 'reactjs-popup/dist/index.css';
import { Link, useNavigate } from "react-router-dom";
import service from "../../service";
import queryString from 'query-string';
import io from 'socket.io-client';
import noAvatar from "../../img/person/noAvatar.png";
const socket = io();


export default function Topbar() {
  const [textSearch,setTextSearch] = useState('');
  const [rsFriend,setRsFriend] = useState(false);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showFriendRequest,setShowFriendRequest] = useState(false)
  const [arrFriendReq,setArrFriendReq] = useState([])
  const [state , dispatch] = useContext(Context)
  const navigate = useNavigate()
  const infoUser = state.infoUser
  const socket = state.socket


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

  useEffect(async () => {
    const rs =  await checkInviteFriend({userID: state.infoUser._id})
    setArrFriendReq(rs.result)
  },[])





  const [countFriendRequestNoti, setCountFriendRequestNoti] = useState(true)
  const [messageNoti, setMessageNoti] = useState(true)
  const [notification, setNotification] = useState(true)

  const handleSignOut = () => {
    navigate("/")
    dispatch({type: 'SIGN_OUT'})
  }

  // const handleFriendNoti = () => {
  //   setFriendRequestNoti(false)
  // }





  // Hàm này dùng để hiện thông báo active notice
  const [notice, set_notice] = useState(false)
  const handler_Click_Notice = () =>{
    set_notice(!notice)

    const fetchData = async ()=>{
      const params={
        id_user : state.infoUser._id
      }
      const query = '?' + queryString.stringify(params)
      const response = await service.notification.putNotification(params.id_user)
      console.log(response)
    }
    fetchData();
    set_load_notification(true)
    set_count_notification(0)
  }

    // state list hiện danh sách thông báo
    const [notifications, set_notifications] = useState([])

    const [count_notification, set_count_notification] = useState(0)

    const [load_notification, set_load_notification] = useState(true)

  // Hàm này dùng để gọi API lấy dữ liệu notification hiện thông báo
  useEffect(()=>{
    if(load_notification){
    const fetchData = async ()=>{
      const id_user = state.infoUser._id
      const response = await service.notification.getNotification(id_user)
      const data_reverse = response.reverse()
      console.log(data_reverse)
      set_notifications(data_reverse)
      for(let i= 0;i< response.length;i++){
        if(response[i].status === false){
          set_count_notification(i+1)
        }
      }
    }
    fetchData();
  }
  },[])
  useEffect(()=>{
    if(socket){
        socket.on('repnotice',(data)=>{
        console.log(data)
        const fetchData = async ()=>{
          const id_user = state.infoUser._id
          const response = await service.notification.getNotification(id_user)
          const data_reverse = response.reverse()
          console.log(data_reverse)
          set_notifications(data_reverse)
          for(let i= 0;i< response.length;i++){
            if(response[i].status === false){
              set_count_notification(i+1)
            }
          }
        }
        fetchData();
      })
    }
  },[socket])


  return (
      <div className="topbarContainer" >
        <div className="topbarLeft" >
          <div onClick={()=> navigate('/')} style={{textDecoration: "none"}}>
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
            <div className="topbarIconItem" onClick={() => {
              setCountFriendRequestNoti(false)
              setShowFriendRequest(!showFriendRequest);
            }}>
              <Person />
              {
                countFriendRequestNoti && arrFriendReq.length > 0 ?
                <span className="topbarIconBadge">{arrFriendReq.length}</span> :
                null
              }
              {
                showFriendRequest ?  (<div className = "dropNotice">
                  {
                      arrFriendReq.length === 0 ? <div style={{height:30,color:'black',textAlign:'center',marginTop:12}}>Không có lời mời kết bạn nào</div>
                          : arrFriendReq.map((value) => {

                            async function handleAcceptFriend() {
                              const rs = await AcceptFriend({userID_req : value._id, userID_rec : infoUser._id})
                            }

                      return <div className="itemInvite" key={value._id}>
                                <img  style={{ marginLeft:10,width: 50, height: 50, borderRadius: '50%',color:'black'}} src={value.profilePicture ==='' ? noAvatar : value.profilePicture } alt="avatar"/>
                                <div style={{flexDirection: 'column',display:'flex',margin:20}}>
                                  <p style={{color: "black"}}>{value.username}</p>
                                  <div style={{marginTop: 10,  display: 'flex',
                                    flexDirection: 'row', justifyContent:'space-between'}}>
                                    <button onClick={handleAcceptFriend} className='btnAccept'>Chấp nhận</button>
                                    <button className='btnRemove'>Xóa</button>
                                  </div>
                                </div>

                        </div>
                          }
                      )
                  }
                </div>) : null

              }
            </div>

            <div className="topbarIconItem" onClick={() => setMessageNoti(false)}>
              <Chat />
              {messageNoti ? <span className="topbarIconBadge">2</span> : null}
            </div>
            <div className="topbarIconItem" onClick={handler_Click_Notice}>
              <Notifications style={{position: "relative"}}/>
              {count_notification > 0 ? <span className="topbarIconBadge">{count_notification}</span> : null}
              {

                notice && (<div className = "dropNotice">
                  {
                    notifications && notifications.map(value =>(
                      <Link to={`/profile/${infoUser._id}`} style={{color : "#070707",textDecoration: "none"}} key={value._id} ><li className="itemMenu" style={{cursor : "pointer"}}>{value.username} đã {value.action} bài viết của bạn</li></Link>
                    ))
                  }
                </div>)


              }
            </div>
          </div>


          <div className="user">
            <img
                src={state.infoUser.profilePicture === '' ? noAvatar : state.infoUser.profilePicture} alt="" className="imgNav"/>
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
