import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyClCF0bi_2HSd8hURBmVVobp5YJyMFKzYo",
    authDomain: "project-dashboard-ae5ef.firebaseapp.com",
    projectId: "project-dashboard-ae5ef",
    storageBucket: "project-dashboard-ae5ef.firebasestorage.app",
    messagingSenderId: "669099400976",
    appId: "1:669099400976:web:7a14b17b4e31d169d18f95",
    measurementId: "G-G67XCM9MCC"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  
