import "./messenger.css";
import React from 'react'
import MessengerConversation from '../../components/messengerConversation/MessengerConversation'
import MessengerSideBar from '../../components/messengerSideBar/MessengerSideBar'
import Topbar from "../../components/topbar/Topbar";


const Messenger = () => {
  return (
    <>
        <Topbar />
        <div className='messenger'>
            <MessengerSideBar />
            <MessengerConversation />
        </div>
    </>
  )
}

export default Messenger