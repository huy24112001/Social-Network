import api from "../api";
import {REACT_APP_BACK_END} from "../constant/backend";

export async function createConversation(data) {
    const url = REACT_APP_BACK_END + '/api/conversations'
    // console.log(data)
    const response = await api.messengerRequests.createConversation(url, data)
    // console.log(response)
  //   return response?.data || []
}

export async function getConversation(data) {
    const url = REACT_APP_BACK_END + `/api/conversations/${data}`
    // console.log(data)
    const response = await api.messengerRequests.getConversation(url)
    // console.log(response)
    return response?.data || []
}

export async function createMessage(data) {
    const url = REACT_APP_BACK_END + '/api/messages'
    // const {token, message} = data
    // console.log(data)
    const response = await api.messengerRequests.createMessage(url, data)
    // console.log(response)
  //   return response?.data || []
}


export async function getConversationsOfUser(data) {
    const url = REACT_APP_BACK_END + `/api/conversations/user/${data}`
    // console.log(data)
    const response = await api.messengerRequests.getConversationsOfUser(url)
    // console.log(response)
    return response?.data || []
}


export async function findConversationBetweenUser(data) {
    const {senderId, receiverId} = data
    const url = REACT_APP_BACK_END + `/api/conversations/${senderId}/${receiverId}`
    // console.log(data)
    const response = await api.messengerRequests.findConversationBetweenUser(url)
    // console.log(response)
    return response?.data || []
}


export async function getMessagesOfConversation(data) {
    const url = REACT_APP_BACK_END + `/api/messages/${data}`
    // console.log(data)
    const response = await api.messengerRequests.getMessagesOfConversation(url)
    // console.log(response)
    return response?.data || []
}




  