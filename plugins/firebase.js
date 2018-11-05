import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const dev = {
  apiKey: "AIzaSyCxjzIiNtQ0Nc2V1_j8eWFdHx0avp7-CSs",
  authDomain: "tickle-development.firebaseapp.com",
  databaseURL: "https://tickle-development.firebaseio.com",
  projectId: "tickle-development",
  storageBucket: "tickle-development.appspot.com",
  messagingSenderId: "1053739599789"
}

const prod = {
  apiKey: "AIzaSyCY3x0GxjLNamXJG-ghiecuPejkuLkIHQQ",
  authDomain: "tickle-production.firebaseapp.com",
  databaseURL: "https://tickle-production.firebaseio.com",
  projectId: "tickle-production",
  storageBucket: "tickle-production.appspot.com",
  messagingSenderId: "279701072079"
}

if (!firebase.apps.length) {
  firebase.initializeApp(prod)
}

const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)

export const db = firestore
export const auth = firebase.auth()
export const storage = firebase.storage().ref()
export const host = 'https://us-central1-tickle-development.cloudfunctions.net'
// export const host = 'https://us-central1-tickle-production.cloudfunctions.net'
