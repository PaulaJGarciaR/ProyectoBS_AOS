import React, { useState, useEffect } from "react";
import { sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase"; 

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Listener para detectar cuando el usuario cambia su contraseña
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Actualizar Firestore cuando el usuario está autenticado
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            lastPasswordChange: serverTimestamp(),
            passwordUpdatedAt: new Date().toISOString(),
            updatedAt: serverTimestamp()
          });
          console.log("Firestore actualizado después del cambio de contraseña");
        } catch (error) {
          console.error("Error actualizando Firestore:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);

    // Validaciones
    if (!email) {
      setError("Por favor ingresa tu correo electrónico");
      return;
    }

    if (!email.includes("@")) {
      setError("Por favor ingresa un correo válido");
      return;
    }

    setLoading(true);

    try {
      console.log("Intentando enviar correo a:", email);
      
      // Configuración adicional para el correo
      const actionCodeSettings = {
        url: window.location.origin + '/login',
        handleCodeInApp: false,
      };

      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      
      // Registrar el intento de recuperación en Firestore
      try {
        // Crear una colección de intentos de recuperación
        const recoveryAttemptRef = doc(db, "passwordRecoveryAttempts", email.replace(/[.@]/g, '_'));
        await setDoc(recoveryAttemptRef, {
          email: email,
          requestedAt: serverTimestamp(),
          status: "email_sent"
        }, { merge: true });
      } catch (firestoreError) {
        console.log("No se pudo registrar en Firestore (esto es opcional):", firestoreError);
      }
      
      console.log("Correo enviado exitosamente");
      setSuccess(true);
      setEmail("");
    } catch (err) {
      console.error("Error completo:", err);
      console.error("Código de error:", err.code);
      console.error("Mensaje de error:", err.message);
      
      // Manejo de errores específicos de Firebase
      switch (err.code) {
        case "auth/user-not-found":
          setError("No existe una cuenta con este correo. Por favor verifica el correo ingresado.");
          break;
        case "auth/invalid-email":
          setError("El correo electrónico no es válido");
          break;
        case "auth/too-many-requests":
          setError("Demasiados intentos. Por favor espera unos minutos e intenta nuevamente");
          break;
        case "auth/network-request-failed":
          setError("Error de conexión. Verifica tu internet");
          break;
        case "auth/unauthorized-domain":
          setError("Dominio no autorizado. Verifica la configuración de Firebase");
          break;
        case "auth/configuration-not-found":
          setError("Configuración de Firebase incompleta");
          break;
        default:
          setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="h-screen bg-indigo-950">
      <div className="flex justify-center items-center h-screen">
        <div className="w-[40%] shadow-inner bg-white rounded-lg">
          <h1 className="text-2xl text-indigo-700 font-bold py-4 text-center">
            ¿Olvidaste tu Contraseña?
          </h1>
          
          <div className="flex justify-center">
            <div className="w-[90%]">
              
              {/* Mensaje de Éxito */}
              {success && (
                <div className="mb-4 p-4 bg-green-50 border border-green-300 rounded-lg">
                  <p className="text-green-800 font-semibold text-sm">
                    ✅ ¡Correo enviado exitosamente!
                  </p>
                  <p className="text-green-700 text-xs mt-1">
                    Revisa tu bandeja de entrada
                  </p>
                  <p className="text-green-700 text-xs mt-1">
                    El correo puede tardar unos minutos en llegar
                  </p>
                </div>
              )}

              {/* Mensaje de Error */}
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-300 rounded-lg">
                  <p className="text-red-700 text-sm font-semibold">❌ {error}</p>
                </div>
              )}

              <div className="w-full">
                <label htmlFor="email" className="text-indigo-900 text-sm font-bold">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  className="mt-2 p-3 w-full rounded-lg bg-[#D6DEE3]/40 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="flex justify-center items-center mx-8 my-6">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-indigo-800 px-6 py-3 rounded-lg font-semibold text-white hover:bg-indigo-600 cursor-pointer w-full disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Enviando...
                    </>
                  ) : (
                    "Recuperar Contraseña"
                  )}
                </button>
              </div>

              <div className="flex justify-center">
                <a
                  href="/login"
                  className="text-indigo-800 font-semibold mb-4 underline"
                >
                  Volver a login
                </a>
              </div>

              {/* Nota adicional */}
              <div className="pb-4 text-center">
                <p className="text-xs text-gray-500">
                  📧 Si no recibes el correo en 5 minutos, revisa tu carpeta de spam
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;