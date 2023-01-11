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