import firebase from 'firebase/app'
import 'firebase/firestore'  
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAC3qau7uKanMemCL65Cr3SmUlgdWf3oOM",
    authDomain: "mymoney-702b6.firebaseapp.com",
    projectId: "mymoney-702b6",
    storageBucket: "mymoney-702b6.appspot.com",
    messagingSenderId: "431294015128",
    appId: "1:431294015128:web:1ee67d3794ab57409b52ed"
  };

  //init firebase
  firebase.initializeApp(firebaseConfig)

  //init services we need
  const  projectFirestore = firebase.firestore();  // database service
  const projectAuth = firebase.auth();

  //initialising timestamp feature ** ALLOWS US TO STORE DATA IN FIREBASE ORDERED BY TIME CREATED
  const timestamp = firebase.firestore.Timestamp

  export {projectFirestore, projectAuth, timestamp}