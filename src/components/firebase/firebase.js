// External imports
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// Internal imports



var firebaseConfig = {
    apiKey: "AIzaSyBh8P2a3lPGtP8cG9SZTEfW1_Z0zeiv9zg",
    authDomain: "recipeapp-aa890.firebaseapp.com",
    databaseURL: "https://recipeapp-aa890-default-rtdb.firebaseio.com",
    projectId: "recipeapp-aa890",
    storageBucket: "recipeapp-aa890.appspot.com",
    messagingSenderId: "926799810849",
    appId: "1:926799810849:web:6e49e249afc906e3e7ee60",
    measurementId: "G-TQ1GBN8NEB"
};

firebase.initializeApp(firebaseConfig)

const database = firebase.database()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { firebase, googleAuthProvider, database as default }