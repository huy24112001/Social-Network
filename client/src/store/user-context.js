import { useEffect, useReducer} from "react";
import Context from "./context";


const initState = {
    infoUser: JSON.parse(localStorage.getItem("infoUser")) || null
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
            infoUser: null
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
