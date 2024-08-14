import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBuywWKBa6K114p8jStnJB5O-wG02GXAfA",
    authDomain: "desafio-es.firebaseapp.com",
    projectId: "desafio-es",
    storageBucket: "desafio-es.appspot.com",
    messagingSenderId: "241963269702",
    appId: "1:241963269702:web:b7abb89688cfcb67ce5447"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);