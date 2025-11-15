// hooks/useAuth.js o playground/useAuth.js
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth cambió, usuario:", currentUser); 
      
      if (currentUser) {
        setUser(currentUser);
        
        // Obtener datos adicionales de Firestore
        try {
          console.log("Buscando en Firestore UID:", currentUser.uid); 
          const userDoc = await getDoc(doc(db, "usuarios", currentUser.uid));
          
          if (userDoc.exists()) {
            const data = userDoc.data();
            console.log("Datos encontrados:", data); 
            setUserData(data);
          } else {
            console.log("No se encontró documento en Firestore"); 
            setUserData(null);
          }
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, userData, loading };
};