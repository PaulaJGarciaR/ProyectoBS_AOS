import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  EmailAuthProvider, 
  reauthenticateWithCredential, 
  updatePassword,
  signInWithEmailAndPassword 
} from "firebase/auth";
import { auth } from "../firebase";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ChangePasswordPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [formData, setFormData] = useState({
    correo: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validatePasswords = () => {
    const { correo, currentPassword, newPassword, confirmPassword } = formData;

    // Validar que todos los campos estén llenos
    if (!correo || !currentPassword || !newPassword || !confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos",
        confirmButtonColor: "#4F46E5"
      });
      return false;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      Swal.fire({
        icon: "error",
        title: "Email inválido",
        text: "Por favor ingresa un email válido",
        confirmButtonColor: "#4F46E5"
      });
      return false;
    }

    // Validar longitud mínima de la nueva contraseña
    if (newPassword.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Contraseña muy corta",
        text: "La nueva contraseña debe tener al menos 6 caracteres",
        confirmButtonColor: "#4F46E5"
      });
      return false;
    }

    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Las contraseñas no coinciden",
        text: "La nueva contraseña y su confirmación deben ser iguales",
        confirmButtonColor: "#4F46E5"
      });
      return false;
    }

    // Validar que la nueva contraseña sea diferente a la actual
    if (currentPassword === newPassword) {
      Swal.fire({
        icon: "error",
        title: "Contraseña no válida",
        text: "La nueva contraseña debe ser diferente a la actual",
        confirmButtonColor: "#4F46E5"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePasswords()) {
      return;
    }

    setLoading(true);

    try {
      const { correo, currentPassword, newPassword } = formData;
      const emailLower = correo.toLowerCase();

      // Primero verificar que el email y contraseña actual sean correctos
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailLower,
        currentPassword
      );

      const user = userCredential.user;

      // Reautenticar al usuario con sus credenciales actuales
      const credential = EmailAuthProvider.credential(
        emailLower,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);

      // Actualizar la contraseña
      await updatePassword(user, newPassword);

      // Limpiar el formulario
      setFormData({
        correo: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

      // Mostrar mensaje de éxito
      await Swal.fire({
        icon: "success",
        title: "¡Contraseña actualizada!",
        text: "Tu contraseña ha sido cambiada exitosamente",
        timer: 2500,
        showConfirmButton: false
      });

      // Redirigir al dashboard o login
      navigate("/dashboard");

    } catch (error) {
      console.error("Error al cambiar contraseña:", error);

      let errorMessage = "No se pudo cambiar la contraseña";

      switch (error.code) {
        case "auth/wrong-password":
          errorMessage = "La contraseña actual es incorrecta";
          break;
        case "auth/user-not-found":
          errorMessage = "No se encontró un usuario con este email";
          break;
        case "auth/invalid-credential":
          errorMessage = "Las credenciales son inválidas";
          break;
        case "auth/invalid-email":
          errorMessage = "El formato del email es inválido";
          break;
        case "auth/weak-password":
          errorMessage = "La nueva contraseña es muy débil";
          break;
        case "auth/requires-recent-login":
          errorMessage = "Por seguridad, necesitas iniciar sesión nuevamente";
          break;
        case "auth/too-many-requests":
          errorMessage = "Demasiados intentos. Intenta más tarde";
          break;
        default:
          errorMessage = error.message || "Ocurrió un error inesperado";
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#4F46E5"
      });
    } finally {
      setLoading(false);
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
              alt="Imagen cambio contraseña"
            />
          </div>

          {/* Formulario lado derecho */}
          <div className="w-[40%] bg-white rounded-r-2xl">
            <div className="mt-6">
              <h1 className="text-4xl font-bold text-center text-indigo-700">
                Cambiar Contraseña
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="w-[100%]">
              <div className="flex justify-center">
                <div className="w-[80%]">
                  {/* Campo de Email */}
                  <input
                    type="email"
                    name="correo"
                    placeholder="Email"
                    className="mt-10 p-3 w-full rounded-lg bg-[#D6DEE3]/40 
                               text-gray-900 placeholder-gray-600 
                               focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />

                  {/* Contraseña actual */}
                  <div className="mt-6 relative w-full">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      name="currentPassword"
                      placeholder="Contraseña actual"
                      className="p-3 w-full rounded-lg bg-[#D6DEE3]/40 
                                 text-gray-900 placeholder-gray-600 
                                 focus:outline-none focus:ring-2 focus:ring-indigo-300 pr-10"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                      onClick={() => togglePasswordVisibility('current')}
                      disabled={loading}
                    >
                      {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {/* Nueva contraseña */}
                  <div className="mt-6 relative w-full">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      name="newPassword"
                      placeholder="Nueva contraseña"
                      className="p-3 w-full rounded-lg bg-[#D6DEE3]/40 
                                 text-gray-900 placeholder-gray-600 
                                 focus:outline-none focus:ring-2 focus:ring-indigo-300 pr-10"
                      value={formData.newPassword}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                      onClick={() => togglePasswordVisibility('new')}
                      disabled={loading}
                    >
                      {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {/* Confirmar nueva contraseña */}
                  <div className="mt-6 relative w-full">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirmar nueva contraseña"
                      className="p-3 w-full rounded-lg bg-[#D6DEE3]/40 
                                 text-gray-900 placeholder-gray-600 
                                 focus:outline-none focus:ring-2 focus:ring-indigo-300 pr-10"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                      onClick={() => togglePasswordVisibility('confirm')}
                      disabled={loading}
                    >
                      {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center m-8">
                <button 
                  type="submit"
                  className="bg-indigo-800 px-6 py-3 rounded-xl font-bold text-white hover:bg-indigo-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={loading}
                >
                  {loading ? "Guardando..." : "Guardar cambios"}
                </button>
              </div>

              <div className="flex justify-center mb-6">
                <Link
                  to="/login"
                  className="text-indigo-800 font-bold underline hover:text-indigo-600"
                >
                  Volver a inicio de sesión
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPage;