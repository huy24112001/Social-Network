import { Box } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { render } from 'react-dom'
import Context from '../../store/context'
import './conversation.css'

const Conversation = ({conversation}) => {
  // console.log(conversation)
  const [state, dispatch] = useContext(Context)
  const infoUser = state.infoUser
  const [hasNoti, setHasNoti] = useState(false)

  const renderConversation = {
    createdAt: conversation.createdAt,
    members: conversation.members.filter((user) => user._id !== infoUser._id),
    _id: conversation._id
  }
  console.log(renderConversation)
  return (
    <Box className='conversation'>
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
    </Box>
  )
}

export default Conversation