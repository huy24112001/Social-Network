import { createContext, useContext, useMemo } from "react";
import { toastError, toastSuccess } from "../../constant/toast";
import { login, signup } from "../../service/authenService";

import 'react-toastify/dist/ReactToastify.css';




export const LoginContext = createContext()


//hook
export const useLoginContext = () => useContext(LoginContext)

//provider
export const LoginContextProvider = ({ children }) => {



    const handleSignup = async (username, password) => {
        let tmp = `{ "username": "${username}", "password": "${password}" }`
        let params = JSON.parse(tmp)
        if (username && password) {
            const response = await signup(params)
            if (response?.result) {
                toastSuccess("Success Notification !")
                // await setCookie("currentuser", response?.token)
                 // setTimeout(() => window.location.reload(), 2000)
                return true ;

            }
            else {
                toastError(response?.error)
                return false;
            }
        }
        else {
            toastError("Error")
            return false;
        }
    }

    const handleLogin = async (username, password) => {
        let tmp = `{ "username": "${username}", "password": "${password}" }`
        let params = JSON.parse(tmp)
        if (username && password) {
            const response = await login(params)
            // console.log(response.)
            if (response?.result) {
                toastSuccess("Success Notification !")
                //  await setCookie("currentuser", response?.token)
                //   setTimeout(() => window.location.reload(), 2000)
                    return true;

            }
            else {
                toastError(response?.error)
                return false ;
            }
        }
        else {
            toastError("Error")
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
