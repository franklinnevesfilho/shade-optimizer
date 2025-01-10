import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const apikey = import.meta.env.VITE_API_KEY;

const firebaseConfig = {
    apiKey: apikey,
    authDomain: "shade-optimizer-95d28.firebaseapp.com",
    databaseURL: "https://shade-optimizer-95d28-default-rtdb.firebaseio.com",
    projectId: "shade-optimizer-95d28",
    storageBucket: "shade-optimizer-95d28.firebasestorage.app",
    messagingSenderId: "203860221071",
    appId: "1:203860221071:web:5d7fdfd3b5d50bc617a4fa"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDB = getFirestore(firebaseApp);


export{
    firebaseApp,
    firebaseAuth,
    firebaseDB
};