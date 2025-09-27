// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { correo, password } = formData;

    if (!correo || !password) {
      return Swal.fire("Todos los campos son obligatorios");
    }

    try {
      const emailLower = correo.toLowerCase();

      // Autenticación en Firebase
      await signInWithEmailAndPassword(auth, emailLower, password);

      Swal.fire("Bienvenido", "Inicio de sesión exitoso", "success");
      navigate("/");
    } catch (error) {
      console.error("Error en login: ", error);

      if (error.code === "auth/wrong-password") {
        Swal.fire("Error", "Contraseña incorrecta", "error");
      } else if (error.code === "auth/user-not-found") {
        Swal.fire("Error", "El usuario no existe", "error");
      } else {
        Swal.fire("Error", "No se pudo iniciar sesión", "error");
      }
    }
  };

  return (
    <div className="h-screen bg-indigo-950">
      <div className="flex justify-center items-center h-screen">
        <div className="w-[100%] flex justify-center shadow-inner">
          {/* Imagen lado izquierdo */}
          <div className="w-[55%] flex justify-end shadow-inner">
            <img
              className="rounded-l-2xl w-full"
              src="https://cubiko.co/wp-content/uploads/2023/01/course-9.jpg"
              alt="Imagen de login"
            />
          </div>

          {/* Formulario lado derecho */}
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
                  />

                  {/* Password con icono */}
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
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4 mr-12">
                <Link
                  className="font-semibold text-indigo-800"
                  to="/forgotpassword"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <div className="flex justify-center items-center m-8">
                <button
                  type="submit"
                  className="bg-indigo-800 px-6 py-3 rounded-xl font-bold text-white hover:bg-indigo-600 cursor-pointer"
                >
                  Ingresar
                </button>
              </div>

              <div className="flex justify-center mb-6">
                <h1>¿No tienes cuenta?</h1>
                <Link
                  to="/register"
                  className="ml-2 text-indigo-800 font-bold underline"
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
