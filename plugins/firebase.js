import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCxjzIiNtQ0Nc2V1_j8eWFdHx0avp7-CSs",
    authDomain: "tickle-development.firebaseapp.com",
    databaseURL: "https://tickle-development.firebaseio.com",
    projectId: "tickle-development",
    storageBucket: "tickle-development.appspot.com",
    messagingSenderId: "1053739599789"
  })
}

const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)

export const db = firestore
export const auth = firebase.auth()
