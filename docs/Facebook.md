# Autenticación con Facebook

## Descripción

Este método permite a los usuarios de la plataforma del proyecto iniciar sesión utilizando sus cuentas de Facebook.

## Requisitos Previos

### 1. Configuración en Meta for Developers (Facebook Login)

1. Ingresar al panel de desarrolladores de Meta: https://developers.facebook.com/
2. Seleccionar la app previamente creada para el proyecto.
3. En el menú lateral, ir a Productos → Facebook Login.
4. Seleccionar Configuración.
5. Verificar los siguientes campos obligatorios:
   - **Valid OAuth Redirect URIs** debe contener:
     - `https://soa-ambr.web.app/__/auth/handler`
     - `http://localhost:5173/__/auth/handler`
6. En Configuración básica, verificar:
   - Logo de la app cargado (PNG recomendado).
   - Nombre de la app correctamente definido.
   - URL de la política de privacidad y términos (si aplica).
7. Guardar cambios.

### 2. Configuración en Firebase Console

1. Ingresar e iniciar sesión en el sitio oficial de firebase https://console.firebase.google.com
2. Seleccionar el proyecto para configurar.
3. Seleccionar Authentication y luego Método de Acceso.
4. Habilitar Facebook como proveedor.
5. Agregar el App ID y App Secret (ambos obtenidos desde el panel de Meta Developers).
6. Guarda los cambios realizados.

### Dependencias del Proyecto

1. Tener instalado firebase en el proyecto.
   Instalación de firebase con el comando: npm install firebase

## Configuración en el Proyecto

### Archivo de Configuración Firebase (`firebase.js`)

```javascript
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
```

## Implementación del Código

### Función Principal:

```javascript
const handleFacebookLogin = async () => {
  setLoading(true);
  const provider = new FacebookAuthProvider();

  provider.addScope("public_profile");
  provider.addScope("email");

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const facebookData = user.providerData.find(
      (p) => p.providerId === "facebook.com"
    );

    const userEmail =
      user.email ||
      facebookData?.email ||
      `${user.uid}@facebook.user`;

    const userName =
      user.displayName ||
      facebookData?.displayName ||
      "Usuario de Facebook";

    const enhancedUser = {
      uid: user.uid,
      email: userEmail,
      displayName: userName,
      photoURL: user.photoURL || facebookData?.photoURL || "",
      emailVerified: user.emailVerified,
      metadata: user.metadata,
      providerData: user.providerData,
    };

    const finalUserId = await createOrUpdateUser(enhancedUser, "facebook");

    if (!finalUserId) {
      throw new Error("No se pudo guardar el usuario");
    }

    await createSessionDocument(finalUserId, enhancedUser, "facebook");

    Swal.fire({
      icon: "success",
      title: `¡Bienvenido ${userName}!`,
      text: "Inicio de sesión exitoso con Facebook",
      timer: 2000,
      showConfirmButton: false,
    });

    navigate("/dashboard");
  } catch (error) {
    console.error("Error en login con Facebook:", error);

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
      Swal.fire("Error", "No se pudo iniciar sesión con Facebook", "error");
    }
  } finally {
    setLoading(false);
  }
};
```

## Botón de implementación

```jsx
<button
  type="button"
  onClick={handleFacebookLogin}
  disabled={loading}
  className="rounded-full bg-indigo-200 p-1.5 w-fit mr-2 cursor-pointer hover:bg-indigo-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
      fill="#3F51B5"
      d="M42,4H6C4.895,4,4,4.895,4,6v36c0,1.105,0.895,2,2,2h20V28h-5v-6h5v-4c0-5.177,3.015-8,7.523-8  c2.182,0,3.835,0.162,4.477,0.234V15h-3.072C31.487,15,31,16.343,31,18v4h6.281l-1,6H31v16h11c1.105,0,2-0.895,2-2V6  C44,4.895,43.105,4,42,4z"
    ></path>
  </svg>
</button>
```