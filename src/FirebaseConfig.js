// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyANk4Q0V4zCjFZzqS4Pu_9sq7-XC31glmM",
  authDomain: "cartjobs-1e861.firebaseapp.com",
  projectId: "cartjobs-1e861",
  storageBucket: "cartjobs-1e861.appspot.com",
  messagingSenderId: "900360902278",
  appId: "1:900360902278:web:9b371c934637a50daa2307"
};


const app = initializeApp(firebaseConfig);
export const database = getAuth(app)