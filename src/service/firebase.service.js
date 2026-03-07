// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-_Ren-aGU17z8GEmwdnQDhNSTS55rE3c",
  authDomain: "assinment-6-ad909.firebaseapp.com",
  projectId: "assinment-6-ad909",
  storageBucket: "assinment-6-ad909.firebasestorage.app",
  messagingSenderId: "724404054328",
  appId: "1:724404054328:web:0293160d4c44ec9780b9cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export default app