import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { initializeApp } from "firebase/app";

export const config = {
    apiKey: "AIzaSyBFWGhe8q4UV633SSdL8lNrsHTbvSlVqKo",
    authDomain: "heartapp-4cb6e.firebaseapp.com",
    projectId: "heartapp-4cb6e",
    storageBucket: "heartapp-4cb6e.appspot.com",
    messagingSenderId: "247795002288",
    appId: "1:247795002288:web:d11c71a6ad8645892e4475"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const app = initializeApp(firebaseConfig);

export { app, firebase }