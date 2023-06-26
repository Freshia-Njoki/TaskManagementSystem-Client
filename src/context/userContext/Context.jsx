import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

//Intial state
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,//if not login user:val = null; in local storage user is stored as obj pass it to json to access it

}


//create context - used in various pages
export const Context = createContext(INITIAL_STATE);

//provider component
export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return (
        <Context.Provider value={{ user: state.user, dispatch }}>
            {children}

        </Context.Provider>
    )

}