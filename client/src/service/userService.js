import api from "../api";
import {REACT_APP_BACK_END} from "../constant/backend";



export async function getFollowings(userId) {
    const url = REACT_APP_BACK_END + `/api/users/friends/${userId}`
  //   console.log(url)
    const response = await api.userRequest.getFollowings(url)
    // console.log(response)
    return response?.data || []
}