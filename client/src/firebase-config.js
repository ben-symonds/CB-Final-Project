import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBl4BG_brAvvUOXhT-Jx9IbTfYrdBrJFpw",
    authDomain: "cb-finalprojectauthentication.firebaseapp.com",
    projectId: "cb-finalprojectauthentication",
    storageBucket: "cb-finalprojectauthentication.appspot.com",
    messagingSenderId: "475501992551",
    appId: "1:475501992551:web:04a0ad13fb7b7ae1d0d2c2"
};

const app = initializeApp(firebaseConfig);

export const auth =getAuth(app);
