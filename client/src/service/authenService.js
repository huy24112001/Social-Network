import { getAsyncWithToken, postAsync } from "../constant/request";
import {REACT_APP_BACK_END} from "../constant/backend";



export async function login(params) {
  const url = REACT_APP_BACK_END + '/api/auth/login'
  console.log(url)
  const response = await postAsync(url, params)
  console.log(response)
  return response?.data || []
}
export async function signup(data) {
  const url = REACT_APP_BACK_END + '/users'
  const response = await postAsync(url, data)
  console.log(response);
  return response?.data || []
}
export async function getUserInfo() {
  const url = REACT_APP_BACK_END + '/users/currentuser'
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
