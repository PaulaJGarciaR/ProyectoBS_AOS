import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB9ZebHPh4_NvVe78MUdlcHI6_KSd9wJsw",
  authDomain: "soa-ambr.firebaseapp.com",
  projectId: "soa-ambr",
  storageBucket: "soa-ambr.firebasestorage.app",
  messagingSenderId: "384299062500",
  appId: "1:384299062500:web:2b718f4338eb39f23308f1",
  measurementId: "G-VRD14V5K9F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Variables para obtener funcionalidad de autenticación
const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();

// Conexion a db
const db = getFirestore(app);

export {auth,GoogleProvider,db,signOut}