import React, { useEffect, useRef, useState } from 'react'
import './messengerConversation.css'
import noAvatar from '../../img/person/noAvatar.png'
import { BsTelephoneFill, BsCameraVideoFill } from 'react-icons/bs'
import { FiMoreHorizontal } from 'react-icons/fi'
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { Icon, IconButton, InputAdornment, Popover, TextField, Tooltip } from '@mui/material'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Messages } from './dummyData'
import Message from '../message/Message'

const CurrentConversationMessage = ({messages}) => {
  const userId = '63980e8b98bb2b88a10bde85'
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className='messengerConversationBody'>
      {messages.map((m) => (
        <div ref={scrollRef}>
          <Message message={m} own={m.sender._id === userId} />
        </div>
      ))}
    </div>
  )
}

const CurrentConversationTopBar = () => {
  return (
    <div className="messengerConversationTop">
      <div className="messengerConversationTopInfo">
        <img src={noAvatar} className='messengerConversationChatAvatar' />
        Khanh Le

      </div>
      <div className="messengerConversationTopIcon">
        <IconButton sx={{ color: "rgb(74, 122, 211)" }}  className='messengerTopIcon' >
          <BsTelephoneFill/>
          
        </IconButton>
        <IconButton sx={{ color: "rgb(74, 122, 211)" }} className='messengerTopIcon' >
          <BsCameraVideoFill/>
          
        </IconButton>
        <IconButton sx={{ color: "rgb(74, 122, 211)" }} className='messengerTopIcon'>
          <FiMoreHorizontal />
          
        </IconButton>
      </div>
    </div>
  )
}

const CurrentConversationInput = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [text, setText] = useState('');
  const [recording, setRecording] = useState(0);

  const handleKeyPress = (e) => {
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      // handleSendMessage();
      console.log('Key press')
    }
  };

  const emojiMart = (
    <Picker
      data={data}
      emoji="point_up"
      // color={FEATURE_COLOR.primary}
      onEmojiSelect={(emoji) => {
        setText(text + emoji.native);
      }}
    />
  );
  return (
    <div className='messengerConversationInput'>
      <TextField
        size="small"
        multiline
        maxRows={1}
        variant="outlined"
        className="messengerConversationTextInput"
        value={text}
        onChange={(e) => setText(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <EmojiEmotionsIcon color="primary" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onKeyDown={handleKeyPress}
      />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        >
        {emojiMart}
      </Popover>
      <div className="messengerConversationIconWrap">
        <Tooltip title="Ghi âm" placement="top">
          {
            !recording ? (
              <IconButton>
                <MicIcon id="test_audio" className="icon" color="primary" />
              </IconButton>
            ) : (
              <IconButton>
                <StopCircleIcon id="stop_audio" className="iconStop" />
              </IconButton>
            )
          }

        </Tooltip>
        <Tooltip title="Gửi" placement="top">
          <IconButton>
            <SendIcon className="icon" color="secondary" />

          </IconButton>

        </Tooltip>
      </div>
    </div>
  )
}

const MessengerConversation = ({currentConversation}) => {
  const messages = Messages
  return (
    <div className='messengerConversation'>
      <CurrentConversationTopBar />
      <CurrentConversationMessage messages={messages} />
      {/* <span className='messengerNoConversation'>
        Chưa chọn đoạn chat nào
      </span> */}
      <CurrentConversationInput />
    </div>
  )
}

export default MessengerConversation