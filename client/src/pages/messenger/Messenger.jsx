import "./messenger.css";
import React, { useContext, useEffect, useState } from 'react'
import MessengerConversation from '../../components/messengerConversation/MessengerConversation'
import MessengerSideBar from '../../components/messengerSideBar/MessengerSideBar'
import Topbar from "../../components/topbar/Topbar";
import { useParams } from "react-router-dom";
import service from "../../service";
import Context from "../../store/context";
import { Info } from "react-feather";


const Messenger = () => {
  const {category,conversationId} = useParams()
  const [state, dispatch] = useContext(Context)
  const infoUser = state.infoUser
  const socket = state.socket
  const [onlineUsers, setOnlineUsers] = useState([])
  useEffect(async () => {
    const conversations = await service.messengerService.getConversationsOfUser(infoUser._id)
    console.log(infoUser._id)

    // console.log(conversations)
    dispatch({
      type: 'GET_CONVERSATIONS',
      payload: conversations
    })

  }, [infoUser,conversationId])

  useEffect(() => {
    if(socket){
      socket.emit('addUser', infoUser._id)
      console.log("connected")
      socket.on("getUsers", (users) => {
        setOnlineUsers(
            infoUser.friends.filter((f) => users.some((u) => u.userId === f))
        );
      });
    }
  }, [socket, infoUser])
  // console.log(onlineUsers)


  useEffect( async () => {
    if (conversationId){
      const messages = await service.messengerService.getMessagesOfConversation(conversationId)
      const conversation = await service.messengerService.getConversation(conversationId)
      const receiver = conversation?.members.filter((user) => user._id !== infoUser._id)[0];
      // console.log(receiver)
      dispatch({
        type: 'CHOOSE_CONVERSATION',
        payload: messages
      })
      dispatch({
        type: 'SET_RECEIVER',
        payload: receiver
      })
      // console.log(conversation)
    }

  }, [conversationId])

  return (
      <>
        <Topbar />
        <div className='messenger'>
          <MessengerSideBar onlineUsers={onlineUsers}  />
          <MessengerConversation />
        </div>
      </>
  )
}

export default Messenger
