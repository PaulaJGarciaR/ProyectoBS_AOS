import React, { useState } from "react";
import Swal from "sweetalert2";
import { db } from "../firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

function ChangePasswordPage() {
  const [form, setForm] = useState({
    correo: "",
    actual: "",
    nueva: "",
    confirmar: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDACIONES BÁSICAS
    if (!form.correo || !form.actual || !form.nueva || !form.confirmar) {
      return Swal.fire("Error", "Todos los campos son obligatorios", "error");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.correo)) {
      return Swal.fire("Error", "Correo inválido", "error");
    }

    if (form.nueva.length < 6) {
      return Swal.fire(
        "Error",
        "La nueva contraseña debe tener al menos 6 caracteres",
        "error"
      );
    }

    if (form.nueva !== form.confirmar) {
      return Swal.fire("Error", "Las contraseñas no coinciden", "error");
    }

    try {
      // CONSULTA POR CORREO (igual que haces en editar usuarios)
      const q = query(collection(db, "usuarios"), where("correo", "==", form.correo.toLowerCase()));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return Swal.fire("Error", "No existe un usuario con ese correo", "error");
      }

      const userDoc = snapshot.docs[0];
      const userData = userDoc.data();

      // VALIDAR CONTRASEÑA ACTUAL
      if (userData.password !== form.actual) {
        return Swal.fire("Error", "La contraseña actual es incorrecta", "error");
      }

      // ACTUALIZAR
      const ref = doc(db, "usuarios", userDoc.id);
      await updateDoc(ref, {
        password: form.nueva,
        repassword: form.nueva,
      });

      Swal.fire("Éxito", "La contraseña fue cambiada correctamente", "success");

      // LIMPIAR FORMULARIO
      setForm({
        correo: "",
        actual: "",
        nueva: "",
        confirmar: "",
      });

    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Hubo un problema al cambiar la contraseña", "error");
    }
  };

  return (
    <div className="h-screen bg-indigo-950">
      <div className="flex justify-center items-center h-screen">
        <div className="w-[100%] flex justify-center shadow-inner">

          {/* Imagen izquierda */}
          <div className="w-[55%] flex justify-end shadow-inner">
            <img
              className="rounded-l-2xl"
              src="https://cubiko.co/wp-content/uploads/2023/01/course-9.jpg"
              alt="Imagen cambio contraseña"
            />
          </div>

          {/* Formulario */}
          <div className="w-[40%] bg-white rounded-r-2xl">
            <div className="mt-6">
              <h1 className="text-4xl font-bold text-center text-indigo-700">
                Cambiar Contraseña
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="w-[100%]">
              <div className="flex justify-center">
                <div className="w-[80%]">

                  <input
                    type="email"
                    name="correo"
                    value={form.correo}
                    onChange={handleChange}
                    placeholder="Correo del usuario"
                    className="mt-10 p-3 w-full rounded-lg bg-[#D6DEE3]/40 
                    text-gray-900 placeholder-gray-600 
                    focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />

                  <input
                    type="password"
                    name="actual"
                    value={form.actual}
                    onChange={handleChange}
                    placeholder="Contraseña actual"
                    className="mt-6 p-3 w-full rounded-lg bg-[#D6DEE3]/40 
                    text-gray-900 placeholder-gray-600 
                    focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />

                  <input
                    type="password"
                    name="nueva"
                    value={form.nueva}
                    onChange={handleChange}
                    placeholder="Nueva contraseña"
                    className="mt-6 p-3 w-full rounded-lg bg-[#D6DEE3]/40 
                    text-gray-900 placeholder-gray-600 
                    focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />

                  <input
                    type="password"
                    name="confirmar"
                    value={form.confirmar}
                    onChange={handleChange}
                    placeholder="Confirmar nueva contraseña"
                    className="mt-6 p-3 w-full rounded-lg bg-[#D6DEE3]/40 
                    text-gray-900 placeholder-gray-600 
                    focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />

                </div>
              </div>

              <div className="flex justify-center items-center m-8">
                <button
                  type="submit"
                  className="bg-indigo-800 px-6 py-3 rounded-xl font-bold text-white hover:bg-indigo-600 cursor-pointer"
                >
                  Guardar cambios
                </button>
              </div>

              <div className="flex justify-center mb-6">
                <a href="/login" className="text-indigo-800 font-bold underline">
                  Volver a inicio de sesión
                </a>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
