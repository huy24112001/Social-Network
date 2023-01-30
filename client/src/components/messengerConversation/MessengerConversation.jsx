import React, { useContext, useEffect, useRef, useState } from 'react'
import './messengerConversation.css'
import noAvatar from '../../img/person/noAvatar.png'
import { BsTelephoneFill, BsCameraVideoFill } from 'react-icons/bs'
import { FiMoreHorizontal } from 'react-icons/fi'
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { IconButton, InputAdornment, Popover, TextField, Tooltip } from '@mui/material'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import Message from '../message/Message'
import Context from '../../store/context'
import generateKey from '../../utils/generate-key'
import { useParams } from 'react-router-dom'
import service from '../../service'
import useRecordingsList from "../../utils/voice-recorder-example/src/hooks/use-recordings-list.js"
import useRecorder from '../../utils/voice-recorder-example/src/hooks/useRecorder';


const CurrentConversationTopBar = ({receiver}) => {
  const avatar = (receiver?.profilePicture === '') ? noAvatar : receiver?.profilePicture
  
  return (
    <div className="messengerConversationTop">
      <div className="messengerConversationTopInfo">
        <img src={avatar} className='messengerConversationChatAvatar' />
        {receiver?.username}

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


const CurrentConversationMessage = ({messages}) => {
  const [state, dispatch] = useContext(Context)
  const scrollRef = useRef();
  const [newMessages, setNewMessages] = useState(messages ? messages : []);
  const socket = state.socket
  const userId = state.infoUser._id
  const { category, conversationId } = useParams()

  useEffect(() => {
    const ac = new AbortController();
    if(socket) {
      socket.once('getMessageFromServer', (data) => {
        const newMessage = {
          _id: generateKey(), 
          conversationId: conversationId,
          text: data?.data?.text,
          audio: data?.data?.audio,
          sender: {_id: data.senderId},
          createdAt: Date(),
          updatedAt: Date(),
          __v: 0
        }
        console.log(newMessage)
        setNewMessages([...newMessages, newMessage])
      })
    }
    return () => ac.abort(); // Abort both fetches on unmount


  }, [socket, newMessages, messages])

  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, newMessages]);

  useEffect(() => {
    setNewMessages(messages)
  }, [messages]);


  return (
    <div className='messengerConversationBody'>
      {/* {messages?.map((m) => (
        <div ref={scrollRef}>
          <Message key={m._id} message={m} own={m.sender._id === userId} />
        </div>
      ))} */}
      {newMessages?.map((m) => (
        <div ref={scrollRef} key={m._id}>
          <Message key={m._id} message={m} own={m.sender._id === userId} />
        </div>
      ))}
    </div>
  )
}


const CurrentConversationInput = ({receiver, handlers, recorderState  }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [text, setText] = useState('');
  const [recording, setRecording] = useState(0);
  const [state, dispatch] = useContext(Context)
  const socket = state.socket
  const infoUser = state.infoUser
  const {conversationId} = useParams()

  const { audio, recordingMinutes, recordingSeconds, initRecording  } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;
  const { recordings, deleteAudio } = useRecordingsList(audio);

  const handleSendMessage = async () => {
    const message = {
      senderId: infoUser._id,
      receiverId: receiver._id,
      data: {
        audio: recordings?.value,
        text: text
      }
    }
    if (recordings) {
      console.log(recordings)
      if (socket){
        socket.emit('sendMessageToServer', message)

      }
      await service.messengerService.createMessage({
        token: infoUser.token,
  
        data: {
          conversationId: conversationId,
          audio: recordings.value
        }
      })
      if (state.conversationSelectMessages === []) {
        await service.messengerService.setActiveConversation(conversationId)
      }
    }
    else {
      if (text !== '') {
        if (socket) {
          socket.emit('sendMessageToServer', message)
        }
        await service.messengerService.createMessage({
          token: infoUser.token,
    
          data: {
            conversationId: conversationId,
            text: text
          }
        })
        if (state.conversationSelectMessages.length === 0) {
          await service.messengerService.setActiveConversation(conversationId)
        }
        setText('')
      }
    }
  }

  const handleRecordMessage = async () => {
    if (!recording){
      setText('')
      setRecording(1)
      console.log("start recording")
      startRecording()
    }
    else {
      setRecording(0)
      saveRecording()
      // cancelRecording()
      // console.log(audio)
      console.log("cancel recording")

    }
  }

  const handleChangeText = (e) => {
    setText(e.target.value)
    cancelRecording()
  }

  
  const handleKeyPress = (e) => {
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
      // console.log(text)
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
        onChange={(e) => handleChangeText(e)}
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
              <IconButton onClick={handleRecordMessage}>
                <MicIcon id="test_audio" className="icon" color="primary" />
              </IconButton>
            ) : (
              <IconButton onClick={handleRecordMessage}>
                <StopCircleIcon id="stop_audio" className="iconStop" />
              </IconButton>
            )
          }

        </Tooltip>
        <Tooltip title="Gửi" placement="top">
          <IconButton onClick={handleSendMessage} >
            <SendIcon className="icon" color="secondary"/>

          </IconButton>

        </Tooltip>
      </div>
    </div>
  )
}

const MessengerConversation = () => {
  const [state, dispatch] = useContext(Context)
  const { recorderState, ...handlers } = useRecorder();
  const { audio, recordingMinutes, recordingSeconds, initRecording  } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;
  const { recordings, deleteAudio } = useRecordingsList(audio);

  // console.log(recordings)
  const messages = state.conversationSelectMessages  
  // const [renderMessages, setRenderMessages] = useState(messages)
  // console.log(messages)
  // useEffect(() => {
  //   setRenderMessages(messages)
  // }, [messages])
  const receiver = state.conversationSelectReceiver
  return (
    <div className='messengerConversation'>
      {
        messages ? (
          <>
            <CurrentConversationTopBar receiver={receiver}/>
            <CurrentConversationMessage messages={messages}  />
            <CurrentConversationInput receiver={receiver} handlers={handlers} recorderState={recorderState}  />
          </>
        ) : (
          <span className='messengerNoConversation'>
            Chưa chọn đoạn chat nào
          </span>

        )
      }
    </div>
  )
}

export default MessengerConversation