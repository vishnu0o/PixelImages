// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvViB-rP07YpcughOIrMxXabjp21EY0bs",
  authDomain: "pixel-images-d1599.firebaseapp.com",
  projectId: "pixel-images-d1599",
  storageBucket: "pixel-images-d1599.appspot.com",
  messagingSenderId: "534602672463",
  appId: "1:534602672463:web:0a091d3d65deac29e3fd3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)