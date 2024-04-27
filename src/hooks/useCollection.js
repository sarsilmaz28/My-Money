import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/Config";

export default function useCollection(collection, _query) {  //_query is used as we will be using useRef to prevent the infinite loop caused to passing a reference type value (query) in as a dependency in useEffect


    //if we dont use useRef --> an infinite loop in useEffect
    //query is an array and is "different" in every function call
    const query = useRef(_query).current  // .current to get the actual value

    const [document, setDocument]= useState()
    const [error, setError]= useState()
    /*****************/
    const [total, setTotal]= useState(0)

    useEffect(()=>{
        let ref = projectFirestore.collection(collection).orderBy("createdAt", "desc")  
                                                        // to show transactions in order as they are added
        
        if(query)
        {
            ref = ref.where(...query)
        }

        //using snapshot to continuosly listen for changes in the collection and change the state whenever there is a change in collection and thus display is always in sync with the collection data in the firestore
        const unsub = ref.onSnapshot((snapshot)=>{
            let result=[]
            let totalAmount=0
            snapshot.docs.forEach(doc =>{
                totalAmount= totalAmount + parseInt(doc.data().amount) 
                result.push({...doc.data(), id: doc.id})  //this id is the id of the object in firebase.NOT THE USER
            })

            //update state
            setTotal(totalAmount)
            setDocument(result)
            setError(null)
        },(error)=>{
            console.log(error)
            setError('Could not fetch data')
        })

        //unsubscribe if the component unmounts
        return ()=> unsub()
    },[collection, query])  //query is passed as whenever we use an outside variable in a use effect, it needs to be passed as a dependency. Use ref needs to be used as query is a reference type so we need to prevent the loop that we did by using **useRef**

    return {document, error,total}
}
