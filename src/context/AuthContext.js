import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/Config";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {

        case 'LOGIN':
            return { ...state, user: action.payload }

        case 'LOGOUT':
            return { ...state, user: null }

        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady: true }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false   // to check if there is already a user logged in when we load 
    })

    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged((user) => { // asking firebase if there is a user logged in
                                                            //if there is, firebase retuns user else returns null
            dispatch({ type: 'AUTH_IS_READY', payload: user })
            unsub();                        // to make this fn run only once ever and not whenever the user changes
        })
    }, [])

    // console.log('Authcontext: ', state);
    return (
        <AuthContext.Provider value={{ ...state, dispatch }} >
            {children}
        </AuthContext.Provider>
    )
}