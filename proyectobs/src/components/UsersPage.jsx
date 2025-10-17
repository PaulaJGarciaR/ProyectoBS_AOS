import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
  });
  const [editId, setEditId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const usuariosCollection = collection(db, "usuarios"); // colección en Firestore

  // Cargar datos desde Firestore
  const fetchUsuarios = async () => {
    const snapshot = await getDocs(usuariosCollection);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setUsuarios(data);
  };

  useEffect(() => {
    fetchUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setFormData({
      nombre: "",
      apellido: "",
      correo: "",
      password: "",
      repassword: "",
      rol: "visitante",
    });
    setEditId(null);
  };

  
  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // Agregar o actualizar usuarios
  const handleAddOrUpdate = async () => {
    // Validaciones básicas
    if (!formData.nombre || !formData.apellido || !formData.correo) {
      return Swal.fire(
        "Error",
        "Nombre, apellido y correo son obligatorios",
        "error"
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      return Swal.fire(
        "Error",
        "Por favor ingresa un correo electrónico válido",
        "error"
      );
    }

    // Validar contraseñas solo al crear usuario nuevo
    if (!editId) {
      if (!formData.password || !formData.repassword) {
        return Swal.fire("Error", "Todos los campos son obligatorios", "error");
      }

      if (formData.password.length < 6) {
        return Swal.fire(
          "Error",
          "La contraseña debe tener al menos 6 caracteres",
          "error"
        );
      }

      if (formData.password !== formData.repassword) {
        return Swal.fire("Error", "Las contraseñas no son iguales", "error");
      }
    }

    // Al editar, validar contraseña solo si se ingresó una nueva
    if (editId && formData.password) {
      if (formData.password.length < 6) {
        return Swal.fire(
          "Error",
          "La contraseña debe tener al menos 6 caracteres",
          "error"
        );
      }

      if (formData.password !== formData.repassword) {
        return Swal.fire("Error", "Las contraseñas no son iguales", "error");
      }
    }

    try {
      if (editId) {
        // EDITAR usuario existente
        const dataToUpdate = {
          nombre: formData.nombre,
          apellido: formData.apellido,
          correo: formData.correo.toLowerCase(),
          rol: formData.rol || "visitante",
        };

        // Solo actualizar password si se ingresó una nueva
        if (formData.password) {
          dataToUpdate.password = formData.password;
          dataToUpdate.repassword = formData.repassword;
        }

        const usuariosDoc = doc(db, "usuarios", editId);
        await updateDoc(usuariosDoc, dataToUpdate);
        Swal.fire("Actualizado", "Usuario editado correctamente", "success");
        setEditId(null);
      } else {
        // AGREGAR nuevo usuario
        const nuevoUsuario = {
          nombre: formData.nombre,
          apellido: formData.apellido,
          correo: formData.correo.toLowerCase(),
          password: formData.password,
          repassword: formData.repassword,
          rol: formData.rol || "visitante",
          estado: "pendiente",
          creado: new Date(),
          metodo: "password",
        };

        await addDoc(usuariosCollection, nuevoUsuario);
        Swal.fire("Éxito", "Usuario agregado correctamente", "success");
      }

      closeModal();
      fetchUsuarios();
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "No se pudo guardar el usuario", "error");
    }
  };

  // Eliminar miembro de staff
  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7c3aed",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const usuarioDoc = doc(db, "usuarios", id);
        await deleteDoc(usuarioDoc);
        Swal.fire("Eliminado", "El usuario fue eliminado", "success");
        fetchUsuarios();
      }
    });
  };

  // Cargar datos en el formulario para editar
  const handleEdit = (person) => {
    setFormData({
      nombre: person.nombre,
      apellido: person.apellido,
      correo: person.correo,
      password: person.password,
      repassword: person.repassword,
    });
    setEditId(person.id);
    setIsModalOpen(true); // Abrir el modal
  };
  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      <div className="bg-indigo-950 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white">
              Gestión de Usuarios
            </h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 cursor-pointer font-semibold text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
          >
            Nuevo Usuario
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-indigo-950 shadow-lg overflow-hidden rounded-lg">
        <table className="w-full">
        <thead className="bg-purple-700 text-white">
          <tr className="text-left text-white">
            <th className="p-2">Nombre</th>
            <th className="p-2">Apellido</th>
            <th className="p-2">Email</th>
            <th className="p-2">Rol</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((person) => (
            <tr key={person.id} className="hover:bg-gray-800">
              <td className="p-2 whitespace-nowrap">
                {person.nombre}
              </td>
              <td className="p-2 whitespace-nowrap">
                {person.apellido}
              </td>
              <td className="p-2">{person.correo}</td>
              <td className="p-2">{person.rol}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(person)}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(person.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
      

      {/* Modal Simple */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white/20 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-indigo-950 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-white mb-4">Nuevo Usuario</h2>

            <div className="mb-6 flex flex-col justify-center">
              <input
                type="text"
                placeholder="Nombre"
                className="p-3 w-full rounded-lg bg-[#D6DEE3]/20 text-gray-900 placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 pr-10"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Apellido"
                className="p-3 mt-4 w-full rounded-lg bg-[#D6DEE3]/20 text-gray-900 placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 pr-10"
                value={formData.apellido}
                onChange={(e) =>
                  setFormData({ ...formData, apellido: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email"
                className="p-3 mt-4 w-full rounded-lg bg-[#D6DEE3]/20 text-gray-900 placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 pr-10"
                value={formData.correo}
                onChange={(e) =>
                  setFormData({ ...formData, correo: e.target.value })
                }
              />

              <div className="mt-6 relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className="p-3 w-full rounded-lg bg-[#D6DEE3]/20 text-gray-900 placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 pr-10"
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
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

                <div className="mt-6 relative w-full">
                <input
                  type={showRePassword ? "text" : "password"}
                  placeholder="Confirmar Contraseña"
                  className="p-3 w-full rounded-lg bg-[#D6DEE3]/20 text-gray-900 placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 pr-10"
                  name="repassword"
                  value={formData.repassword}
                  onChange={(e) =>
                    setFormData({ ...formData, repassword: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  onClick={() => setShowRePassword(!showRePassword)}
                >
                  {showRePassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleAddOrUpdate}
                className="bg-purple-600 text-white px-4 py-2 mr-2  hover:bg-purple-700 rounded-lg"
              >
                {editId ? "Actualizar" : "Agregar"}
              </button>

              <button
                onClick={() => closeModal()}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersPage;
