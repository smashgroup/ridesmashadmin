import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyAAqFHkCyeC2sKMMMBLFQYvw2u0vBJIEZs",
  authDomain: "https://ridesmash.com/",
  projectId: "smashride-ee7a7",
  storageBucket: "smashride-ee7a7.appspot.com",
  messagingSenderId: "425620499927",
  appId: "1:425620499927:web:3a5c333265b54b38f12f92",
  measurementId: "G-4GL1H1TDQF"

};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);