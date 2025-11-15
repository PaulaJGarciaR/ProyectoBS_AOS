import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../firebase";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  // Obtener datos de Google si vienen del login
  const emailFromGoogle = location.state?.email || "";
  const fromGoogle = location.state?.fromGoogle || false;
  const googleUid = location.state?.uid || null;

  const [formData, setFormData] = useState({
    nombre: "", 
    apellido: "", 
    correo: emailFromGoogle, 
    password: "", 
    repassword: "" 
  });

  // Actualizar el email si viene de Google
  useEffect(() => {
    if (emailFromGoogle) {
      setFormData(prev => ({
        ...prev,
        correo: emailFromGoogle
      }));

      // Mostrar mensaje informativo
      Swal.fire({
        icon: "info",
        title: "Completa tu registro",
        text: `Por favor completa tus datos para registrar la cuenta ${emailFromGoogle}`,
        confirmButtonColor: "#4F46E5",
      });
    }
  }, [emailFromGoogle]);

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
      const emailLower = correo.toLowerCase();
      let user;

      // Si viene de Google, el usuario ya existe en Auth
      if (fromGoogle && googleUid) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, emailLower, password);
          user = userCredential.user;
        } catch (signInError) {
          user = { uid: googleUid };
          console.log(signInError)
        }
      } else {
        // Registro normal: crear usuario en Firebase Auth
        const userMethod = await createUserWithEmailAndPassword(auth, emailLower, password);
        user = userMethod.user;
      }

      // Verificar si ya existe en Firestore
      const userDocRef = doc(db, "usuarios", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        return Swal.fire({
          icon: "info",
          title: "Usuario ya registrado",
          text: "Este usuario ya está completamente registrado. Puedes iniciar sesión.",
          confirmButtonColor: "#4F46E5",
        }).then(() => {
          navigate("/login");
        });
      }

      // Guardar datos en firestore
      await setDoc(userDocRef, {
        uid: user.uid,
        nombre, 
        apellido, 
        correo: emailLower, 
        estado: "activo", 
        rol: "visitante", 
        creado: new Date(), 
        metodo: fromGoogle ? "google" : "password" 
      });

      Swal.fire({
        icon: "success",
        title: "¡Registrado!",
        text: "Usuario creado con éxito. Ahora puedes iniciar sesión.",
        confirmButtonColor: "#4F46E5",
      });
      
      navigate("/login");
    } catch (error){
        console.error("Error de registro: ", error);

        if(error.code === "auth/email-already-in-use"){
          Swal.fire({
            icon: "warning",
            title: "Correo ya registrado",
            html: `
              <p>Este correo ya tiene una cuenta en Firebase Authentication.</p>
              <p><strong>¿Qué hacer?</strong></p>
              <ul style="text-align: left; margin: 10px 40px;">
                <li>Si te registraste con Google, intenta iniciar sesión con Google</li>
                <li>Si olvidaste tu contraseña, usa "¿Olvidaste tu contraseña?"</li>
                <li>Si el problema persiste, contacta soporte</li>
              </ul>
            `,
            confirmButtonText: "Ir a Login",
            confirmButtonColor: "#4F46E5",
            showCancelButton: true,
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          });
        } else if (error.code === "auth/weak-password") {
          Swal.fire({
            icon: "error",
            title: "Contraseña débil",
            text: "La contraseña debe tener al menos 6 caracteres.",
            confirmButtonColor: "#4F46E5",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo completar el registro. Intenta nuevamente.",
            confirmButtonColor: "#4F46E5",
          });
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
              {fromGoogle && (
                <p className="text-center text-sm text-gray-600 mt-2">
                  Completa tus datos para continuar
                </p>
              )}
            </div>
            <form onSubmit={handleSubmit} className="w-[100%]">
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
                    className="mt-6 p-3 w-full rounded-lg bg-[#D6DEE3]/40 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    name="correo"
                    required
                    value={formData.correo}
                    onChange={handleChange}
                    disabled={fromGoogle}
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
                <Link
                  to="/login"
                  className="ml-2 text-indigo-800 font-bold underline hover:text-indigo-600"
                >
                  Inicia sesión
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;