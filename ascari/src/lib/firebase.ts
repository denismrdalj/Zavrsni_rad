import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/auth"
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAaptRDf_-eS1oqt3cY6Pt8LdnaKem10T0",
    authDomain: "ascari-89d0d.firebaseapp.com",
    projectId: "ascari-89d0d",
    storageBucket: "ascari-89d0d.appspot.com",
    messagingSenderId: "983467910478",
    appId: "1:983467910478:web:3d9435b42a960840a6ea1f",
    measurementId: "G-XBXTFSMP3F"
  };
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)

  