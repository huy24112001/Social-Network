import api from "../api";
import {REACT_APP_BACK_END} from "../constant/backend";



// export async function login(params) {
//   const url = REACT_APP_BACK_END + '/api/auth/login'
//   console.log(url)
//   const response = await postAsync(url, params)
//   console.log(response)
//   return response?.data || []
// }

export async function createPost(data) {
  const url = REACT_APP_BACK_END + '/api/posts'
//   console.log(url)
  const response = await api.postRequests.createPost(url, data)
  console.log(response)
//   return response?.data || []
}

export async function updatePost(data) {
  console.log(data)
  const url = REACT_APP_BACK_END + `/api/posts/${data.data._id}`
//   console.log(url)
  const response = await api.postRequests.updatePost(url, data)
  // console.log(response)
//   return response?.data || []
}

export async function getProfilePost(userId) {
  const url = REACT_APP_BACK_END + `/api/posts/profile/${userId}`
//   console.log(url)
  const response = await api.postRequests.getProfilePost(url)
  // console.log(response)
  return response?.data || []
}

export async function getTimelinePost(userId) {
  const url = REACT_APP_BACK_END + `/api/posts/timeline/${userId}`
//   console.log(url)
  const response = await api.postRequests.getTimelinePost(url)
  console.log(response)
  return response?.data || []
}

export async function createComment(data) {
  const url = REACT_APP_BACK_END + '/api/comments/create'
//   console.log(url)
  const response = await api.postRequests.createPost(url, data)
  console.log(response)
//   return response?.data || []
}

export async function likePost(data) {
  const {id, token} = data
  const url = REACT_APP_BACK_END + `/api/posts/${id}/like`
  const response = await api.postRequests.likePost(url, token)
//   return response?.data || []
}

export async function deletePost(data) {
  const {id, token} = data
  console.log(token)
  const url = REACT_APP_BACK_END + `/api/posts/${id}`
  const response = await api.postRequests.deletePost(url, token)
//   return response?.data || []
}

