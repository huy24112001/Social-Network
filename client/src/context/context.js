import {createContext, useContext, useMemo, useReducer, useState} from "react";
import { toastError, toastSuccess } from "../constant/toast";
import { login, signup } from "../service/authenService";

import 'react-toastify/dist/ReactToastify.css';
import Context from "../store/context";
export const LoginContext = createContext()


//hook
export const useLoginContext = () => useContext(LoginContext)




//provider
export const LoginContextProvider = ({ children }) => {



    const handleSignup = async (username, password, email) => {
        let tmp = `{ "username": "${username}", "password": "${password}" , "email" : "${email}" }`
        let params = JSON.parse(tmp)
        if (username && password && email) {
            const response = await signup(params)
            console.log(response)
            if (response?.result) {
                // dispatch({type : 'SET_USER', payload : {...response.result, token: response.token} })
                toastSuccess("Đăng Nhập Thành Công !")
                // await setCookie("currentuser", response?.token)
                // setTimeout(() => window.location.reload(), 2000)
                return response ;

            }
            else {
                toastError(response?.error)
                return false;
            }
        }
        else {
            toastError("Đã xảy ra lỗi !")
            return false;
        }
    }

    const handleLogin = async (username, password) => {
        let tmp = `{ "email": "${username}", "password": "${password}" }`
        let params = JSON.parse(tmp)
        if (username && password) {
            const response = await login(params)
            console.log(response)

            if (response?.result) {
                toastSuccess("Đăng Nhập Thành Công !")
                // console.log(response.result)
                //  await setCookie("currentuser", response?.token)
                //   setTimeout(() => window.location.reload(), 2000)
                return response;
            }
            else {
                toastError(response?.error)
                return false ;
            }
        }
        else {
            toastError("Đã xảy ra lỗi !")
            return false ;
        }
    }


    const value = useMemo(() => ({
            handleSignup, handleLogin
        }),
        [])
    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    )
}
