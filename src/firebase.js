// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// ❗ Only keep analytics if you really need it
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAbrzDPFQIbY_bF_FpriWVb_JZvkTatQtg",
  authDomain: "car-marketplace-5b808.firebaseapp.com",
  projectId: "car-marketplace-5b808",
  storageBucket: "car-marketplace-5b808.firebasestorage.app",
  messagingSenderId: "1015991055729",
  appId: "1:1015991055729:web:df51d9811710f324d4b2d0",
  measurementId: "G-PH7QTWHPVK"
};

const app = initializeApp(firebaseConfig);

// 🔥 THIS WAS MISSING
export const auth = getAuth(app);