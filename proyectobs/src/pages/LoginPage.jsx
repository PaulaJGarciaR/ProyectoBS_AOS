import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    correo: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Función para verificar si el usuario existe en Firestore
  const checkUserExists = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "usuarios", uid));
      return userDoc.exists();
    } catch (error) {
      console.error("Error al verificar usuario:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { correo, password } = formData;

    if (!correo || !password) {
      return Swal.fire("Todos los campos son obligatorios");
    }

    setLoading(true);

    try {
      const emailLower = correo.toLowerCase();

      // Autenticación en Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailLower,
        password
      );
      const user = userCredential.user;

      // Verificar si el usuario existe en Firestore
      const exists = await checkUserExists(user.uid);

      if (!exists) {
        // Si no existe en Firestore, cerrar sesión y mostrar error
        await auth.signOut();
        return Swal.fire({
          icon: "error",
          title: "Usuario no registrado",
          text: "Este usuario no está registrado en el sistema. Por favor regístrate primero.",
          confirmButtonColor: "#4F46E5",
        });
      }

      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Inicio de sesión exitoso",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      console.error("Error en login: ", error);

      if (error.code === "auth/wrong-password") {
        Swal.fire("Error", "Contraseña incorrecta", "error");
      } else if (error.code === "auth/user-not-found") {
        Swal.fire("Error", "El usuario no existe", "error");
      } else if (error.code === "auth/invalid-credential") {
        Swal.fire("Error", "Credenciales inválidas", "error");
      } else {
        Swal.fire("Error", "No se pudo iniciar sesión", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const exists = await checkUserExists(user.uid);

      if (!exists) {
        await auth.signOut();

        return Swal.fire({
          icon: "warning",
          title: "Usuario no registrado",
          html: `
            <p>El usuario <strong>${user.email}</strong> no está registrado en el sistema.</p>
            <p>Por favor, completa el formulario de registro para continuar.</p>
          `,
          confirmButtonText: "Ir a Registro",
          confirmButtonColor: "#4F46E5",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/register", { 
              state: { 
                email: user.email,
                uid: user.uid,
                fromGoogle: true 
              } 
            });
          }
        });
      }

      // Si existe, permitir el acceso
      Swal.fire({
        icon: "success",
        title: `¡Bienvenido ${user.displayName}!`,
        text: "Inicio de sesión exitoso",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
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
        console.log("Popup cancelado - Se abrió otro popup");
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        Swal.fire(
          "Error",
          "Ya existe una cuenta con este correo usando otro método",
          "error"
        );
      } else {
        Swal.fire("Error", "No se pudo iniciar sesión con Google", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-indigo-950">
      <div className="flex justify-center items-center h-screen">
        <div className="w-[100%] flex justify-center shadow-inner">
          <div className="w-[55%] flex justify-end shadow-inner">
            <img
              className="rounded-l-2xl w-full"
              src="https://cubiko.co/wp-content/uploads/2023/01/course-9.jpg"
              alt="Imagen de login"
            />
          </div>

          <div className="w-[40%] bg-white rounded-r-2xl">
            <div className="mt-6">
              <h1 className="text-4xl font-bold text-center text-indigo-700">
                Inicia Sesión
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="w-[100%]">
              <div className="flex justify-center">
                <div className="w-[80%]">
                  <input
                    type="email"
                    placeholder="Email"
                    className="mt-10 p-3 w-full rounded-lg bg-[#D6DEE3]/40 
                               text-gray-900 placeholder-gray-600 
                               focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />

                  <div className="mt-6 relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña"
                      className="p-3 w-full rounded-lg bg-[#D6DEE3]/40 
                                 text-gray-900 placeholder-gray-600 
                                 focus:outline-none focus:ring-2 focus:ring-indigo-300 pr-10"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4 mr-12">
                <Link
                  className="font-semibold text-indigo-800 hover:text-indigo-600"
                  to="/forgotpassword"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <div className="flex justify-center items-center my-4">
                <button
                  type="submit"
                  className="bg-indigo-800 px-6 py-3 rounded-xl font-bold text-white hover:bg-indigo-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "Cargando..." : "Ingresar"}
                </button>
              </div>

              <div>
                <div className="flex justify-center">
                  <h1 className="text-sm font-semibold">O inicia sesión con</h1>
                </div>
                <div className="flex justify-center my-4">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
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
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      ></path>
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      ></path>
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                    </svg>
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    className="rounded-full bg-indigo-200 p-1.5 w-fit mr-2 cursor-pointer hover:bg-indigo-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="40"
                      height="40"
                      viewBox="0 0 30 30"
                    >
                      <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                    </svg>
                  </button>

                  <button
                    type="button"
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
                        fill="#3f51b5"
                        d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"
                      ></path>
                      <path
                        fill="#fff"
                        d="M29.368,24H26v12h-5V24h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H30v4h-2.287 C26.104,16,26,16.6,26,17.723V20h4L29.368,24z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex justify-center mb-6">
                <h1>¿No tienes cuenta?</h1>
                <Link
                  to="/register"
                  className="ml-2 text-indigo-800 font-bold underline hover:text-indigo-600"
                >
                  Regístrate
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;