# Autenticación con GitHub

## Descripción

Este método permite a los usuarios de la plataforma del proyecto iniciar sesión utilizando sus cuentas de Github.

## Requisitos Previos

### 1. Crear OAuth App en GitHub

1. Ir a GitHub Settings del perfil del miembro encargado del equipo.
2. Seleccionar OAuth Apps y luego New OAuth App
3. Completar el formulario requrido:
   - Nombrar la aplicación.
   - Agregar la Homepage URL (http://localhost:5173)
   - Agregar laAuthorization callback URL.
4. Registrar la aplicación.
5. Se generó un Client ID.
6. Se generó un Client Secret.

### 2. Configuración en Firebase Console

## Configuración en Firebase Console

1. Ingresar e iniciar sesión en el sitio oficial de firebase https://console.firebase.google.com
2. Seleccionar el proyecto para configurar.
3. Seleccionar Authentication y luego Método de Acceso.
4. Habilitar Github como proveedor.
5. Agregar el Client ID y Client Secret que generó Github.
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
const handleGitHubLogin = async () => {
    setLoading(true);
    const provider = new GithubAuthProvider();
    provider.addScope('user:email');
    provider.addScope('read:user');

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const githubData = user.providerData.find(p => p.providerId === 'github.com');
      const userEmail = user.email || githubData?.email || `${user.uid}@github.user`;
      const userName = user.displayName || githubData?.displayName || "Usuario de GitHub";

      const enhancedUser = {
        uid: user.uid,
        email: userEmail,
        displayName: userName,
        photoURL: user.photoURL || githubData?.photoURL || "",
        emailVerified: user.emailVerified,
        metadata: user.metadata,
        providerData: user.providerData
      };
      const finalUserId = await createOrUpdateUser(enhancedUser, 'github');
      
      if (!finalUserId) {
        throw new Error("No se pudo guardar el usuario");
      }

      await createSessionDocument(finalUserId, enhancedUser, 'github');

      Swal.fire({
        icon: "success",
        title: `¡Bienvenido ${userName}!`,
        text: "Inicio de sesión exitoso con GitHub",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error en login con GitHub:", error);

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
        Swal.fire("Error", "No se pudo iniciar sesión con GitHub", "error");
      }
    } finally {
      setLoading(false);
    }
  };

## Botón de implementación

<button
    type="button"
    onClick={handleGitHubLogin}
    disabled={loading}
    className="rounded-full bg-indigo-200 p-1.5 w-fit mr-2 cursor-poinhover:bg-indigo-300 transition-colors disabled:opacitydisabled:cursor-not-allowed"
    >
    <svg
         xmlns="http://www.w3.org/2000/svg"
         x="0px"
        y="0px"
        width="40"
        height="40"
        viewBox="0 0 30 30"
    >
            <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
    </svg>
</button>