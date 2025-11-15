import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { db } from "../firebase"; // tu config de Firebase
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function StaffCRUD() {
  const [staff, setStaff] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const [editId, setEditId] = useState(null);

  const staffCollection = collection(db, "staff"); // colección en Firestore

  // Cargar datos desde Firestore
  const fetchStaff = async () => {
    const snapshot = await getDocs(staffCollection);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setStaff(data);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Agregar o actualizar staff
  const handleAddOrUpdate = async () => {
    if (!formData.name || !formData.email || !formData.role) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    if (editId) {
      // Editar en Firestore
      const staffDoc = doc(db, "staff", editId);
      await updateDoc(staffDoc, formData);
      Swal.fire("Actualizado", "Miembro de staff editado correctamente", "success");
      setEditId(null);
    } else {
      // Agregar en Firestore
      await addDoc(staffCollection, formData);
      Swal.fire("Éxito", "Miembro de staff agregado correctamente", "success");
    }

    setFormData({ name: "", email: "", role: "" });
    fetchStaff(); // refrescar lista
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
        const staffDoc = doc(db, "staff", id);
        await deleteDoc(staffDoc);
        Swal.fire("Eliminado", "El miembro de staff fue eliminado", "success");
        fetchStaff();
      }
    });
  };

  // Cargar datos en el formulario para editar
  const handleEdit = (person) => {
    setFormData({ name: person.name, email: person.email, role: person.role });
    setEditId(person.id);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-900 min-h-screen text-gray-100">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-400">CRUD Staff</h2>

      {/* Formulario */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Nombre"
          className="bg-gray-800 border border-purple-500 p-2 rounded text-gray-100 placeholder-gray-400"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="bg-gray-800 border border-purple-500 p-2 rounded text-gray-100 placeholder-gray-400"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Cargo"
          className="bg-gray-800 border border-purple-500 p-2 rounded text-gray-100 placeholder-gray-400"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        />
      </div>
      <button
        onClick={handleAddOrUpdate}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full md:w-auto"
      >
        {editId ? "Actualizar Staff" : "Agregar Staff"}
      </button>

      {/* Tabla - Desktop */}
      <div className="hidden md:block mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-purple-700 text-left text-white">
              <th className="p-2 border border-purple-500">ID</th>
              <th className="p-2 border border-purple-500">Nombre</th>
              <th className="p-2 border border-purple-500">Email</th>
              <th className="p-2 border border-purple-500">Cargo</th>
              <th className="p-2 border border-purple-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((person) => (
              <tr key={person.id} className="hover:bg-gray-800">
                <td className="p-2 border border-purple-500">{person.id}</td>
                <td className="p-2 border border-purple-500">{person.name}</td>
                <td className="p-2 border border-purple-500">{person.email}</td>
                <td className="p-2 border border-purple-500">{person.role}</td>
                <td className="p-2 border border-purple-500">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(person)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(person.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile */}
      <div className="md:hidden mt-6 space-y-4">
        {staff.map((person) => (
          <div key={person.id} className="bg-gray-800 rounded-lg p-4 border border-purple-500">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-start">
                <span className="text-gray-400 text-sm">ID:</span>
                <span className="text-white text-right break-all">{person.id}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-400 text-sm">Nombre:</span>
                <span className="text-white font-semibold text-right">{person.name}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-400 text-sm">Email:</span>
                <span className="text-white text-right break-all">{person.email}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-400 text-sm">Cargo:</span>
                <span className="text-white text-right">{person.role}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(person)}
                className="flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(person.id)}
                className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} export default StaffCRUD;