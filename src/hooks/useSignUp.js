import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/Config"
import { useAuthContext } from "./useAuthContext"


export const useSignUp = () => {

    const [isCancelled, setIsCancelled]=useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const signup = async (email, password, dispalyName) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            
            if(!res){
                throw new Error("Could not create User")
            }

            await res.user.updateProfile({displayName:dispalyName})

            dispatch({type:'LOGIN', payload: res.user})
            if(!isCancelled){
            setIsPending(false)
            setError(null)
            }
        }
        catch (err) {
            if(!isCancelled){
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
            }
        }

    }

    useEffect(()=>{
        return ()=> setIsCancelled(true)
    },[])

    return {error,isPending, signup}
}