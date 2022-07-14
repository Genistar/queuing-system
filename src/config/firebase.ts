import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDRiZRusog3v2PdwUq84Bu_Z37KwpwV62s",
    authDomain: "queuing-system-707b4.firebaseapp.com",
    projectId: "queuing-system-707b4",
    storageBucket: "queuing-system-707b4.appspot.com",
    messagingSenderId: "450140895434",
    appId: "1:450140895434:web:3f8b2912b2da3dacb55c33",
    measurementId: "G-LB5B74WMLL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)