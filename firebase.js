// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app'
import * as firebase from 'firebase'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAJKQ7YSNocZhAfRfCA7lBp3-Y9QHaLts0',
  authDomain: 'testing-3e933.firebaseapp.com',
  projectId: 'testing-3e933',
  storageBucket: 'testing-3e933.appspot.com',
  messagingSenderId: '559673002946',
  appId: '1:559673002946:web:28468bec1883138ec2e45b'
}
// Initialize Firebase
let app
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth }
// Initialize Firebase
// const app = initializeApp(firebaseConfig)

// const app
// if (firebase.apps.length === 0) {
//   app.initializeApp(firebaseConfig)
// } else {
//   app = firebase.app()
// }

// // Retrieve services via the defaultApp variable...
// var defaultAuth = app.auth()
// var defaultDatabase = defaultApp.database();
