import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function RegisterPage() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "", apellido: "", correo: "", password: "", repassword: "" 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      nombre, apellido, correo, password, repassword 
    } = formData;

    // Validaciones
    if(
      !nombre || !apellido || !correo || !password || !repassword
    ){
      return Swal.fire("Todos los campos son obligatorios");
    }
    if(password.length < 6){
      return Swal.fire("La contraseña debe tener al menos 6 caracteres");
    }
    if(password !== repassword){
      return Swal.fire("Las contraseñas no son iguales");
    }
    try {
      const emailLower = correo.toLocaleLowerCase();

      // Crea usuario para el servicio de autenticación de firebase
      const userMethod = await createUserWithEmailAndPassword(auth, emailLower, password);
      const user = userMethod.user;

      // Guardar datos en firestore
      await setDoc (doc(db, "usuarios", user.uid), {
        uid: user.uid,
        nombre, apellido, correo: emailLower, password, repassword, estado: "pendiente", rol: "visitante", creado: new Date(), metodo: "password" 

      });

      Swal.fire("Registrado", "Usuario creado con exito", "success");
      navigate("/login")
    } catch (error){
        console.error("Error de registro: ", error);

        if(error.code === "auth/email-already-in-use"){
          Swal.fire("Correo en uso", "Debe ingresar otro correo", "error");
        }
    }
  }

  return (
    <div className="h-screen bg-indigo-950">
      <div className="flex justify-center items-center h-screen">
        <div className="w-[100%] flex justify-center shadow-inner">
          {/* Imagen lado izquierdo */}
          <div className="w-[55%] flex justify-end shadow-inner">
            <img
              className="rounded-l-2xl w-full"
              src="https://cubiko.co/wp-content/uploads/2023/01/course-9.jpg"
              alt="Imagen de registro"
            />
          </div>

          {/* Formulario lado derecho */}
          <div className="w-[40%] bg-white rounded-r-2xl">
            <div className="mt-6">
              <h1 className="text-4xl font-bold text-center text-indigo-700">
                Regístrate
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="w-[100%]" action="">
              <div className="flex justify-center">
                <div className="w-[80%]">
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="mt-10 p-3 w-full rounded-lg bg-[#D6DEE3]/40 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="Apellido"
                    className="mt-6 p-3 w-full rounded-lg bg-[#D6DEE3]/40 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    name="apellido"
                    required
                    value={formData.apellido}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="mt-6 p-3 w-full rounded-lg bg-[#D6DEE3]/40 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    name="correo"
                    required
                    value={formData.correo}
                    onChange={handleChange}
                  />

                  <div className="mt-6 relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña"
                      className="p-3 w-full rounded-lg bg-[#D6DEE3]/40 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 pr-10"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>


                  <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    className="mt-6 p-3 w-full rounded-lg bg-[#D6DEE3]/40 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    name="repassword"
                    required
                    value={formData.repassword}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex justify-center items-center m-8">
                <button type="submit" className="bg-indigo-800 px-6 py-3 rounded-xl font-bold text-white hover:bg-indigo-600 cursor-pointer">
                  Crear cuenta
                </button>
              </div>

              <div className="flex justify-center mb-6">
                <h1>¿Ya tienes cuenta?</h1>
                <a
                  href="/login"
                  className="ml-2 text-indigo-800 font-bold underline"
                >
                  Inicia sesión
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;