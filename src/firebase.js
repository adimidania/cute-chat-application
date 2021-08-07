import firebase from "firebase/app"
import "firebase/auth"

/**
 * By doing this, we are exporting the auth by firebase that has all the info about my app
 */
export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyDBvA8v5WFIfFaBMwpFiaf8H72dc592kP0",
    authDomain: "daniechat.firebaseapp.com",
    projectId: "daniechat",
    storageBucket: "daniechat.appspot.com",
    messagingSenderId: "375012127202",
    appId: "1:375012127202:web:a86270438407e0e53149bb"
}).auth()