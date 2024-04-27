import { useEffect, useReducer, useState } from "react"
import { projectFirestore, timestamp } from "../firebase/Config"


let initialState = {  //This is declared outside so that new copy is not created everytime we use the hook 
    document: null,
    error: null,
    isPending: false,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {

        case 'IS_PENDING':
            return { isPending: true, success: false }

        case 'ADD_DOCUMENT':
            return { document: action.payload, error: null, isPending: false, success: true }

        case 'DELETE_DOCUMENT':
            return { document: null, error: null, isPending: false, success: true }

        case 'ERROR':
            return { error: action.payload, document: null, isPending: false, success: false }

        default:
            return state
    }
}

export const useFirestore = (collection) => {  // passing collection as an argument in the hook makes the hook more reusable. we can use the hook to work for other type of data as well other than transactions. Collection will be passed as a parameter whenever the hook is invoked

    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)  //for cleanup function

    //fn to check for if component is unmounted i.e isCancelled is false or not . 
    const dispatchIfNotCancelled = (action) => {  //Created so that we dont need to write if statement everytime
        if (!isCancelled)
            dispatch(action)
    }

    //collection ref
    const ref = projectFirestore.collection(collection)  //just a reference so that we dont need to write "projectFirestore.collection(collection)"  again to use any method like add or delete

    //add document into collection
    const addDocument = async (doc) => {  //'doc' here is the object that gets created after filling the transaction form 

        dispatch({ type: 'IS_PENDING' })

        try {

            const createdAt = timestamp.fromDate(new Date())  //time transaction is created is stored and added to 
            const addedDocument = await ref.add({ ...doc, createdAt: createdAt })  // firebase here
            dispatchIfNotCancelled({ type: 'ADD_DOCUMENT', payload: addedDocument })
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }

    //delete document from collection
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            await ref.doc(id).delete()
            dispatchIfNotCancelled({ type: 'DELETE_DOCUMENT' })
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }

    //cleanup fn
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, response }
}