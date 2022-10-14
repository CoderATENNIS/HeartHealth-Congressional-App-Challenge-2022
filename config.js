import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
    apiKey: "AIzaSyAoBsqTwl-GVhHd1RtIy_I2FbLQMcoLTd8",
    authDomain: "heartappcongressional.firebaseapp.com",
    projectId: "heartappcongressional",
    storageBucket: "heartappcongressional.appspot.com",
    messagingSenderId: "302790298454",
    appId: "1:302790298454:web:fa71252b44c382c64f64f7",
    measurementId: "G-RSKHHEFF1T"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const app = initializeApp(firebaseConfig);

export {app, firebase}


