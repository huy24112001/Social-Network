import React, { useContext } from 'react'
import { render } from 'react-dom'
import Context from '../../store/context'
import './conversation.css'

const Conversation = ({conversation}) => {
  // console.log(conversation)
  const [state, dispatch] = useContext(Context)
  const infoUser = state.infoUser

  const renderConversation = {
    createdAt: conversation.createdAt,
    members: conversation.members.filter((user) => user._id !== infoUser._id),
    _id: conversation._id
  }
  console.log(renderConversation)
  return (
    <div className='conversation'>
        <img src={conversation.members[0].profilePicture} alt="avatar" className='conversationAvatar'/>
        <div>

        </div>
    </div>
  )
}

export default Conversation