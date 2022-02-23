// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app'
import * as firebase from 'firebase'
// import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAJKQ7YSNocZhAfRfCA7lBp3-Y9QHaLts0',
  authDomain: 'testing-3e933.firebaseapp.com',
  projectId: 'testing-3e933',
  storageBucket: 'testing-3e933.appspot.com',
  messagingSenderId: '559673002946',
  appId: '1:559673002946:web:28468bec1883138ec2e45b',

  databaseURL:
    'https://testing-3e933-default-rtdb.europe-west1.firebasedatabase.app/'
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  // measurementId: 'G-MEASUREMENT_ID'
}
// Initialize Firebase
let app
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

// const database = firebase.database()

const auth = firebase.auth()

export { auth }
