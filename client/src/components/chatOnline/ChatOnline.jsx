import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import service from '../../service';
import Context from '../../store/context';
import './chatOnline.css'

const ChatOnline = ({onlineUsers}) => {
    // console.log(onlineUsers)
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const [state, dispatch] = useContext(Context)
    const infoUser = state.infoUser
    const navigate = useNavigate()
    const {category, conversationId} = useParams()
    const [selectConversationId, setSelectConversationId] = useState()
    // console.log(infoUser?._id)

    useEffect(() => {
        const getFriends = async () => {
            const result = await service.userService.getFollowings(infoUser?._id)
            console.log(result)
            setFriends(result);
        };
        getFriends();
        return () => {
            setFriends([]); 
          };
      }, [infoUser]);

    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
        // setOnlineFriends(onlineUsers);
        // console.log(onlineUsers)
        return () => {
            setOnlineFriends([]); 
          };
      

    }, [friends, onlineUsers]);

    useEffect(() => {
      console.log(onlineFriends)
    }, [onlineFriends])
    

    

    const handleClick = async (user) => {
        try {
            console.log(onlineFriends)
            const conversation = await service.messengerService.findConversationBetweenUser({
                senderId: infoUser._id, 
                receiverId: user._id
            })
            if (!conversation) {
                const conversation = await service.messengerService.createConversation({
                    data: {
                        receiverId: user._id
                    },
                    token: infoUser.token
                })
                const renderConversation = {
                    createdAt: conversation.createdAt,
                    members: conversation.members.filter((user) => user._id !== infoUser._id),
                    _id: conversation._id
                  }
                dispatch({
                    type: 'SET_RECEIVER',
                    payload: renderConversation.members[0]
                  })
    
                navigate(`/messenger/${category}/${conversation._id}`)
            }
            else {
                const renderConversation = {
                    createdAt: conversation.createdAt,
                    members: conversation.members.filter((user) => user._id !== infoUser._id),
                    _id: conversation._id
                  }
                dispatch({
                    type: 'SET_RECEIVER',
                    payload: renderConversation.members[0]
                  })
    
                navigate(`/messenger/${category}/${conversation._id}`)
            }
        } catch (error) {
            
        }
        // console.log(o)
    }

    return (
        <div className="chatOnline">
        {onlineFriends?.map((o) => (
            <div key={o._id} className="chatOnlineFriend" onClick={() => handleClick(o)}>
            <div className="chatOnlineImgContainer">
                <img
                className="chatOnlineImg"
                src={
                    o?.profilePicture
                }
                alt=""
                />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{o?.username}</span>
            </div>
        ))}
        </div>
    )
}

export default ChatOnline