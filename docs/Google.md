# Autenticación con Google

## Descripción

Este método permite a los usuarios de la plataforma del proyecto iniciar sesión utilizando sus cuentas de Google.

## Requisitos Previos

### Configuración en Firebase Console

1. Ingresar e iniciar sesión en el sitio oficial de firebase https://console.firebase.google.com
2. Seleccionar el proyecto para configurar.
3. Seleccionar Authentication y luego Método de Acceso.
4. Habilitar Google como proveedor.
5. Configurar el correo electrónico de soporte para el proyecto.
6. Guarda los cambios realizados.

### Dependencias del Proyecto

1. Tener instalado firebase en el proyecto.
   Instalación de firebase con el comando: npm install firebase

## Configuración en el Proyecto

### Archivo de Configuración Firebase (`firebase.js`)

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

## Implementación del Código

### Función Principal:

const handleGoogleLogin = async () => {
setLoading(true);
const provider = new GoogleAuthProvider();

    provider.addScope('email');
    provider.addScope('profile');

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const googleData = user.providerData.find(p => p.providerId === 'google.com');
      const userEmail = user.email || googleData?.email || `${user.uid}@google.user`;
      const userName = user.displayName || googleData?.displayName || "Usuario de Google"

      const enhancedUser = {
        uid: user.uid,
        email: userEmail,
        displayName: userName,
        photoURL: user.photoURL || googleData?.photoURL || "",
        emailVerified: user.emailVerified,
        metadata: user.metadata,
        providerData: user.providerData
      };

      // Crear/actualizar usando el UID correcto
      const finalUserId = await createOrUpdateUser(enhancedUser, 'google');

      if (!finalUserId) {
        throw new Error("No se pudo guardar el usuario");
      }

      // Crear sesión con el UID correcto
      await createSessionDocument(finalUserId, enhancedUser, 'google');

      Swal.fire({
        icon: "success",
        title: `¡Bienvenido ${userName}!`,
        text: "Inicio de sesión exitoso con Google",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error en login con Google:", error);

      if (error.code === "auth/popup-closed-by-user") {
        Swal.fire({
          icon: "info",
          title: "Cancelado",
          text: "Cerraste la ventana de inicio de sesión",
          timer: 2000,
          showConfirmButton: false,
        });
      } else if (error.code === "auth/cancelled-popup-request") {
        console.log("Popup cancelado");
      } else if (error.code === "auth/account-exists-with-different-credential") {
        Swal.fire({
          icon: "warning",
          title: "Cuenta existente",
          text: "Ya existe una cuenta con este email. Usa el método de inicio de sesión original.",
          confirmButtonColor: "#4F46E5",
        });
      } else {
        Swal.fire("Error", "No se pudo iniciar sesión con Google", "error");
      }
    } finally {
      setLoading(false);
    }

};

## Botón de implementación

<button
    type="button"
    onClick={handleGoogleLogin}
    disabled={loading}
    className="rounded-full bg-indigo-200 p-1.5 w-fit mr-2 cursor-poinhover:bg-indigo-300 transition-colors disabled:opacitydisabled:cursor-not-allowed"
    >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="40"
        height="40"
        viewBox="0 0 48 48"
    >
    <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.0420-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
    <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.14.691z"
    ></path>
    <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.71    24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,4    44z"
    ></path>
    <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.57001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44659,43.862,21.35,43.611,20.083z"
    ></path>
</svg>
</button>
