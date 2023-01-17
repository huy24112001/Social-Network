import { Box } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { render } from 'react-dom'
import { NavLink, useNavigate } from 'react-router-dom'
import Context from '../../store/context'
import './conversation.css'

const Conversation = ({conversation}) => {
  // console.log(conversation)
  const [state, dispatch] = useContext(Context)
  const infoUser = state.infoUser
  const [hasNoti, setHasNoti] = useState(false)
  const [select, setSelect] = useState(false)
  const navigate = useNavigate()

  const renderConversation = {
    createdAt: conversation.createdAt,
    members: conversation.members.filter((user) => user._id !== infoUser._id),
    _id: conversation._id
  }
  // console.log(renderConversation)
  const handleChooseConversation = () => {
    // navigate(`/messenger/${conversation._id}`)
    // setSelect(true)
    dispatch({
      type: 'SET_RECEIVER',
      payload: renderConversation.members[0]
    })
  }
  // console.log(renderConversation)
  return (
    <NavLink to={`/messenger/t/${conversation._id}`} className={({isActive}) => isActive ? 'conversation select' : 'conversation'} onClick={handleChooseConversation}>
        <img src={renderConversation.members[0].profilePicture} alt="avatar" className='conversationAvatar'/>
        {
          hasNoti ? (
            <Box className='conversationContent'>
              <p className='conversationName__noti'>{renderConversation.members[0].username}</p>
              <div style={{height: '8px'}}></div>
              <p className='conversationNoti__noti'>{renderConversation.members[0].username}</p>
            </Box>
          ) : (
            <Box className='conversationContent'>
              <p className='conversationName'>{renderConversation.members[0].username}</p>
              <div style={{height: '8px'}}></div>
              <p className='conversationNoti'>{renderConversation.members[0].username}</p>
            </Box>
          ) 
        }
    </NavLink>
  )
}

export default Conversation