import { useEffect, useReducer} from "react";
import Context from "./context";


const initState = {
    infoUser: JSON.parse(localStorage.getItem("infoUser")) || null,
    socket: null,
    conversations: null,
    conversationSelectMessages: null,
    conversationSelectReceiver: null
}

function reducer(state, action){

    switch (action.type){
        case 'SET_USER':
            return {
                infoUser : action.payload,
            }

        case 'SIGN_OUT': 
            localStorage.removeItem("infoUser");
            return {
                ...state,
                infoUser: null,
                socket: null,
                conversations: null
            }

        case 'CONNECT_SOCKET': 
            return {
                ...state,
                socket: action.payload
            }

        case 'GET_CONVERSATIONS': 
            return {
                ...state,
                conversations: action.payload
            }

        case 'CHOOSE_CONVERSATION': 
            return {
                ...state,
                conversationSelectMessages: action.payload
            }
        
        case 'SET_RECEIVER': 
            return {
                ...state,
                conversationSelectReceiver: action.payload
            }

        case 'CHANGE_CATEGORY': 
            return {
                ...state,
                conversationSelectMessages: null,
                conversationSelectReceiver: null
            }
        default :
            throw  new Error('Invalid Action')

    }

}

function Provider({children}){
    const [state, dispatch] = useReducer(reducer, initState);

    useEffect(()=>{
        localStorage.setItem("infoUser", JSON.stringify(state.infoUser))
        if(state.infoUser === null) {
            localStorage.removeItem("infoUser");
        }
      },[state.infoUser])

    return(
        <Context.Provider value={[state , dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default Provider;
