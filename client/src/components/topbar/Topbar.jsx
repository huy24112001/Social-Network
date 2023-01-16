import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import {useContext, useState,useEffect} from "react";
import {searchUser} from "../../service/authenService";
import Context from "../../store/context";
import { IconButton } from "@mui/material";
import 'reactjs-popup/dist/index.css';
import { Link, useNavigate } from "react-router-dom";
import service from "../../service";
import queryString from 'query-string';
import io from 'socket.io-client';
const socket = io();


export default function Topbar() {
  const [textSearch,setTextSearch] = useState('');
  const [state , dispatch] = useContext(Context)
  const infoUser = state.infoUser
  const socket = state.socket

  async function handleSearch() {

    const rs = await searchUser({username: textSearch})
    if (rs.result) console.log('thanh cong');
    else
    console.log(rs.result.length);  
  }

  const [friendRequestNoti, setFriendRequestNoti] = useState(true)
  const [messageNoti, setMessageNoti] = useState(true)
  const [notification, setNotification] = useState(true)

  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/")
    dispatch({type: 'SIGN_OUT'})
  }

  const handleFriendNoti = () => {
    setFriendRequestNoti(false)
  }


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
        socket.on(`rep${state.infoUser._id}`,(data)=>{
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
                src="/assets/person/1.jpeg" alt="" className="imgNav"/>
            <span style={{position: "relative"}} className="name">{state.infoUser.username}</span>
            <ul className="menu">
              <li className="itemMenu" style={{cursor : "pointer"}}><Link to={`/profile/${infoUser._id}`} style={{color : "#070707",textDecoration: "none"}}>Trang cá nhân</Link></li>
              <li className="itemMenu" style={{cursor: "pointer"}}><div style={{color : "#131313",textDecoration: "none"}} onClick={handleSignOut}>Đăng xuất</div></li>
              {/* <li className="itemMenu"><Link to="/" style={{color : "#131313",textDecoration: "none"}} onClick={handleSignOut}>Đăng xuất</Link></li> */}
            </ul>
          </div>

        </div>
      </div>

  );
}
