
import {getAsync, getAsyncWithToken,putAsyncWithToken,postAsync} from "../api/request";
import {REACT_APP_BACK_END} from "../constant/backend";
export async function postNotification(data){
    const url = REACT_APP_BACK_END + '/api/notification'
    const response = await postAsync(url,data)
    return response?.data || []
}

export async function getNotification(userId) {
    const url = REACT_APP_BACK_END + `/api/notification/${userId}`
    const response = await getAsync(url)
    return response?.data || []
}

export async function putNotification(userId){
    const url = REACT_APP_BACK_END + `/api/notification/update/${userId}`
    console.log(url)
    const response = await putAsyncWithToken(url, userId)
    return response?.data || []
}