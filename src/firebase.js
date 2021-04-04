import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCDRD4lclqXOdPV_7lAejw5JU8-yEQXEvw",
    authDomain: "pizzeria-ae1ee.firebaseapp.com",
    projectId: "pizzeria-ae1ee",
    storageBucket: "pizzeria-ae1ee.appspot.com",
    messagingSenderId: "247935351525",
    appId: "1:247935351525:web:571ad078f33f704d03f20c"
});

const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const storage = firebaseApp.storage()


export {db, auth, storage}