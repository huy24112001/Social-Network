import {deleteAsyncWithToken, getAsync, getAsyncWithToken, postAsync, putAsyncWithToken} from "../api/request";
import {REACT_APP_BACK_END} from "../constant/backend";
export async function login(params) {
  const url = REACT_APP_BACK_END + '/api/auth/login'
  // console.log(url)
  const response = await postAsync(url, params)
  // console.log(response)
  return response?.data || []
}


export async function signup(data) {
  const url = REACT_APP_BACK_END + '/api/auth/register'
  const response = await postAsync(url, data)
  console.log(response);
  return response?.data || []
}
export async function getUserInfo({userId}) {
  const url = REACT_APP_BACK_END + `/api/users/${userId}`
  const response = await getAsyncWithToken(url)
  return response?.data || []
}


export async function logoutUser() {
  const url = REACT_APP_BACK_END + '/users/logout'
  await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' ,
      'Accept': 'application/json',
    }
  },

  ).then(data => { console.log('data', data?.statusText);return data?.statusText || '' })
    .catch(err => console.log(`err`, err))
}

export async function searchUser(param) {
  const url = REACT_APP_BACK_END + '/api/friends/search'
  const response = await getAsync(url,param)
  return response?.data || []
}

export async function statusFriendUser(param) {
  const url = REACT_APP_BACK_END + '/api/friends/status'
  const response = await getAsync(url,param)

  return response?.data || []
}

export async function removeInviteFriend(param) {
  const url = REACT_APP_BACK_END + '/api/friends/remove'
  const response = await deleteAsyncWithToken(url,param)

  return response?.data || []
}

export async function removeFriend(param) {
  const url = REACT_APP_BACK_END + '/api/friends/remove'
  const response = await deleteAsyncWithToken(url,param)

  return response?.data || []
}

export async function inviteFriend(data) {
  const url = REACT_APP_BACK_END + '/api/friends/send-request'
  const response = await postAsync(url, data)
  return response?.data || []
}

export async function checkInviteFriend(data){
  // console.log(data)
  const url = REACT_APP_BACK_END + '/api/friends/check-invite'
  const response = await getAsync(url,data)

  return response?.data || []
}


export async function AcceptFriend(data){
  // console.log(data)
  const url = REACT_APP_BACK_END + '/api/friends/accept'
  const response = await putAsyncWithToken(url,data)

  return response?.data || []
}

export async function getListFriend(param) {
  const url = REACT_APP_BACK_END + '/api/friends/list-friends'
  const response = await getAsync(url,param)

  return response?.data || []
}
