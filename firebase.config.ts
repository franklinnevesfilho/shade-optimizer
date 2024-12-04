import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBe5RYGB2eqk_IXp86SZP3jtuYqn_DkzWM",
    authDomain: "shade-optimizer-95d28.firebaseapp.com",
    databaseURL: "https://shade-optimizer-95d28-default-rtdb.firebaseio.com",
    projectId: "shade-optimizer-95d28",
    storageBucket: "shade-optimizer-95d28.firebasestorage.app",
    messagingSenderId: "203860221071",
    appId: "1:203860221071:web:5d7fdfd3b5d50bc617a4fa"
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

export default {
    firebaseApp,
    firebaseAuth
};