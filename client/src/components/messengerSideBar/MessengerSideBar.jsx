import React from 'react'
import "./messengerSideBar.css"
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import { useContext, useEffect, useState } from "react";
import {BsFillChatFill, BsPeopleFill} from 'react-icons/bs'
import Context from "../../store/context";
import noAvatar from '../../img/person/noAvatar.png'
import {TextField} from "@mui/material";
import {Conversations} from "./dummyData"
import Conversation from '../conversations/Conversation';


const categories = [
    {name: 'Chat', icon: <BsFillChatFill />}, 
    {name: 'Mọi người', icon: <BsPeopleFill/>}
]


const MessengerSideBarMenu = () => {
    const [state, dispatch] = useContext(Context)
    const infoUser = state.infoUser

    const avatar = infoUser.profilePicture === '' ? noAvatar : infoUser.profilePicture

    return (
        <div className='messengerSideBarMenu'>
            <div className='messengerSideBarCategory'>
                {/* <NavLink
                    to="/"
                    // className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}
                    // onClick={handleCloseSidebar}
                > */}
                    {/* <div>
                        <ChatBubbleRoundedIcon />
                        Chat
                    </div> */}

                {/* </NavLink> */}
                {/* <h3 className='mt-2 px-5 text-base 2xl:text-xl'>
                    Discover categories
                </h3> */}
                {categories.slice(0, categories.length).map((category) => (
                    // <NavLink 
                    //   to={`/category/${category.name}`}
                    //   className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}
                    //   onClick={handleCloseSidebar}
                    //   key={category.name}
                    // >
                    <div className="messengerCategoryItem">
                        <div className='messengerCategoryItemIcon'>
                            {category.icon}
                        </div>
                        <p>
                        {category.name}
                        </p>
                    </div>
                    // </NavLink>
                ))}
            </div>
            {infoUser ? (
                <div className='messengerSideBarAccount'>
                    <img src={avatar} alt="avatar" className='messengerSideBarAvatar' />
                    <p>{infoUser.username}</p>
                </div>
            ) : null}
        </div>
    )
}

const MessengerSideBarContent = () => {
    console.log(Conversations)
    return (
        <div className='messageSideBarContent'>
            <div className='messengerSideBarTop'>
                <p>Chat</p>
            </div>
            <div className='messengerSideBarSearch'>
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    label="Search"
                />
            </div>
            {
                Conversations.map((conversation) => (
                    <Conversation key={conversation._id} conversation={conversation} />
                ))
            }
        </div>
        
    )
}

const MessengerSideBar = () => {
  return (
    <div className='messengerSideBar'>
        <MessengerSideBarMenu />
        <MessengerSideBarContent />
    </div>
  )
}

export default MessengerSideBar