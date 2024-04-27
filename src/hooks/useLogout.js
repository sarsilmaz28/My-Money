import { projectAuth } from "../firebase/Config";
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () =>{
    const [isCancelled, setIsCancelled]=useState(false)
    const [error, setError]= useState(null)
    const [isPending, setIsPending]= useState(false)
    const {dispatch} = useAuthContext()

    const logout = async () =>{
        setError(null)
        setIsPending(true)

        try{
            await projectAuth.signOut()  //logout from firestore

            dispatch({type: 'LOGOUT'})  // logout locally

            if(!isCancelled){
            setError(null)
            setIsPending(false)
            }
        }
        catch(err){
            if(!isCancelled){
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
            }
        }

    }

    useEffect(()=>{
        return ()=> setIsCancelled(true)  //Cleanup function
    },[])

    return {logout, error, isPending}
}