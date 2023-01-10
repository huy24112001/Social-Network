import { useReducer} from "react";
import Context from "./context";


const initState = {
    infoUser: {
        username : '1',
        password: '1'
    }
}

 function reducer(state, action){

    switch (action.type){
        case 'SET_USER':
            return {
                infoUser : action.payload,
            }
        default :
            throw  new Error('Invalid Action')

    }

}

function Provider({children}){
    const [state, dispatch] = useReducer(reducer, initState);
    return(
        <Context.Provider value={[state , dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default Provider;
