import React, { useState, useEffect } from "react";
import { sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            lastPasswordChange: serverTimestamp(),
            passwordUpdatedAt: new Date().toISOString(),
            updatedAt: serverTimestamp(),
          });
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
      const actionCodeSettings = {
        url: window.location.origin + "/login",
        handleCodeInApp: false,
      };

      await sendPasswordResetEmail(auth, email, actionCodeSettings);

      try {
        const recoveryAttemptRef = doc(
          db,
          "passwordRecoveryAttempts",
          email.replace(/[.@]/g, "_")
        );
        await setDoc(
          recoveryAttemptRef,
          {
            email: email,
            requestedAt: serverTimestamp(),
            status: "email_sent",
          },
          { merge: true }
        );
      } catch {}

      setSuccess(true);
      setEmail("");
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("No existe una cuenta con este correo.");
          break;
        case "auth/invalid-email":
          setError("El correo electrónico no es válido");
          break;
        case "auth/too-many-requests":
          setError("Demasiados intentos. Intenta luego.");
          break;
        case "auth/network-request-failed":
          setError("Error de conexión. Verifica tu internet");
          break;
        default:
          setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-950 px-4">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-xl shadow-2xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl text-indigo-700 font-bold text-center mb-4">
          ¿Olvidaste tu Contraseña?
        </h1>

        {/* Éxito */}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-300 rounded-lg">
            <p className="text-green-800 font-semibold text-sm">
              ✅ ¡Correo enviado exitosamente!
            </p>
            <p className="text-green-700 text-xs mt-1">Revisa tu bandeja de entrada</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-300 rounded-lg">
            <p className="text-red-700 text-sm font-semibold">❌ {error}</p>
          </div>
        )}

        {/* Input */}
        <label className="text-indigo-900 text-sm font-bold">Email</label>
        <input
          type="email"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          onKeyPress={handleKeyPress}
          disabled={loading}
          className="mt-2 mb-4 p-3 w-full rounded-lg bg-gray-200/40 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50"
        />

        {/* Botón */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-indigo-800 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 flex justify-center items-center gap-2"
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

        <div className="mt-4 text-center">
          <a href="/login" className="text-indigo-700 font-semibold underline text-sm">
            Volver a login
          </a>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          📧 Si no recibes el correo en 5 minutos, revisa spam.
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
