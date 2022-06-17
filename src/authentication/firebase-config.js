import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getDatabase} from "firebase/database";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoPAQUik-YRZjX3WcSGvpbhO_gK0Uiz7Q",
  authDomain: "modplanus-1c3ba.firebaseapp.com",
  projectId: "modplanus-1c3ba",
  storageBucket: "modplanus-1c3ba.appspot.com",
  messagingSenderId: "1480562933",
  appId: "1:1480562933:web:7ec0a122cd19f2302c4dbc",
  measurementId: "G-V1ZM1M3SB5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth(app);
firebase.initializeApp(firebaseConfig);
export default firebaseConfig;