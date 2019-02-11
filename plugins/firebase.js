import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const dev = {
  apiKey: "AIzaSyA1i2qU-jYhuVqlcWVeSAwuXvaHI9OqZpM",
  authDomain: "tickle-indonesia.firebaseapp.com",
  databaseURL: "https://tickle-indonesia.firebaseio.com",
  projectId: "tickle-indonesia",
  storageBucket: "tickle-indonesia.appspot.com",
  messagingSenderId: "228048389763"
}

const prod = {
  apiKey: "AIzaSyA1i2qU-jYhuVqlcWVeSAwuXvaHI9OqZpM",
  authDomain: "tickle-indonesia.firebaseapp.com",
  databaseURL: "https://tickle-indonesia.firebaseio.com",
  projectId: "tickle-indonesia",
  storageBucket: "tickle-indonesia.appspot.com",
  messagingSenderId: "228048389763"
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
//export const host = 'https://us-central1-tickle-development.cloudfunctions.net'
export const host = 'https://us-central1-tickle-indonesia.cloudfunctions.net'
