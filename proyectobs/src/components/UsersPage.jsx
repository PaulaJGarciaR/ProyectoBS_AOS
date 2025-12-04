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
import { FaEye, FaEyeSlash, FaFilePdf, FaFileExcel } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    displayName: "",
  });
  const [editId, setEditId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const usuariosCollection = collection(db, "usuarios");

  const fetchUsuarios = async () => {
    const snapshot = await getDocs(usuariosCollection);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setUsuarios(data);
  };

  useEffect(() => {
    fetchUsuarios();
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

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // Función para exportar a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Configurar fuente y colores
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    const primaryColor = [79, 70, 229];

    // Encabezado del reporte
    doc.setFontSize(20);
    doc.setTextColor(...primaryColor);
    doc.setFont("helvetica", "bold");
    doc.text("Reporte de Usuarios", doc.internal.pageSize.getWidth() / 2, 20, {
      align: "center",
    });

    // Fecha de generación
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    const fechaActual = new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    doc.text(`Fecha: ${fechaActual}`, 14, 28);

    doc.setDrawColor(124, 58, 237);
    doc.setLineWidth(0.5);
    doc.line(14, 32, 196, 32);

    // Preparar datos para la tabla
    const tableData = usuarios.map((usuario) => [
      usuario.nombre || "Usuario",
      usuario.apellido || "",
      usuario.correo || "N/A",
      usuario.rol || "visitante",
      usuario.estado || "pendiente",
      usuario.metodo || "password",
    ]);

    // Generar tabla usando autoTable importado
    autoTable(doc, {
      startY: 38,
      head: [["Nombre", "Apellido", "Email", "Rol", "Estado", "Método"]],
      body: tableData,
      theme: "striped",
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 9,
        halign: "center",
      },
      bodyStyles: {
        fontSize: 8,
        textColor: [50, 50, 50],
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
      margin: { top: 10, left: 14, right: 14 },
      styles: {
        overflow: "linebreak",
        cellPadding: 3,
      },
    });

    // Pie de página con número de registros
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text(
        `Total de usuarios: ${usuarios.length} | Página ${i} de ${pageCount}`,
        14,
        doc.internal.pageSize.height - 10
      );
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const fileName = `Reporte_Usuarios_${year}-${month}-${day}.pdf`;
    doc.save(fileName);

    Swal.fire({
      icon: "success",
      title: "PDF Generado",
      text: "El archivo PDF se ha descargado correctamente",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // Función para exportar a Excel
  const exportToExcel = () => {
    // Preparar datos para Excel
    const excelData = usuarios.map((usuario) => ({
      Nombre: usuario.nombre || "Usuario",
      Apellido: usuario.apellido || "",
      Email: usuario.correo || "N/A",
      Rol: usuario.rol || "visitante",
      Estado: usuario.estado || "pendiente",
      Método: usuario.metodo || "password",
    }));

    // Crear libro de trabajo
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();

    // Ajustar ancho de columnas
    const columnWidths = [
      { wch: 15 }, // Nombre
      { wch: 15 }, // Apellido
      { wch: 30 }, // Email
      { wch: 12 }, // Rol
      { wch: 12 }, // Estado
      { wch: 12 }, // Método
    ];
    worksheet["!cols"] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");

    // Descargar el archivo
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    XLSX.writeFile(workbook, `Reporte_Usuarios_${year}-${month}-${day}.xlsx`);

    Swal.fire({
      icon: "success",
      title: "Excel Generado",
      text: "El archivo Excel se ha descargado correctamente",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const handleAddOrUpdate = async () => {
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
        const dataToUpdate = {
          nombre: formData.nombre,
          apellido: formData.apellido,
          correo: formData.correo.toLowerCase(),
          rol: formData.rol || "visitante",
        };

        if (formData.password) {
          dataToUpdate.password = formData.password;
          dataToUpdate.repassword = formData.repassword;
        }

        const usuariosDoc = doc(db, "usuarios", editId);
        await updateDoc(usuariosDoc, dataToUpdate);
        Swal.fire("Actualizado", "Usuario editado correctamente", "success");
        setEditId(null);
      } else {
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

  const handleEdit = (person) => {
    setFormData({
      nombre: person.nombre,
      apellido: person.apellido,
      correo: person.correo,
      password: person.password,
      repassword: person.repassword,
    });
    setEditId(person.id);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 min-h-screen text-gray-100">
      <div className="bg-indigo-950 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white">
              Gestión de Usuarios
            </h1>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 cursor-pointer font-semibold text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              Nuevo Usuario
            </button>
            <button
              onClick={exportToPDF}
              className="bg-red-600 hover:bg-red-700 cursor-pointer font-semibold text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
              title="Exportar a PDF"
            >
              <span className="hidden sm:inline">Exportar PDF</span>
            </button>
            <button
              onClick={exportToExcel}
              className="bg-green-600 hover:bg-green-700 cursor-pointer font-semibold text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
              title="Exportar a Excel"
            >
              <span className="hidden sm:inline">Exportar Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-indigo-950 shadow-lg overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-purple-700 text-white">
              <tr className="text-left text-white">
                <th className="p-3">Nombre</th>
                <th className="p-3">Apellido</th>
                <th className="p-3">Email</th>
                <th className="p-3">Rol</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-8 text-gray-400">
                    No hay usuarios registrados
                  </td>
                </tr>
              ) : (
                usuarios.map((person) => (
                  <tr
                    key={person.id}
                    className="hover:bg-gray-800 border-b border-gray-700"
                  >
                    <td className="p-3 whitespace-nowrap">
                      {person.nombre || "Usuario"}
                    </td>
                    <td className="p-3 whitespace-nowrap">{person.apellido}</td>
                    <td className="p-3">{person.correo}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 ">{person.rol}</span>
                    </td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(person)}
                        className="px-3 py-1 bg-purple-600 text-white rounded font-semibold hover:bg-purple-700 cursor-pointer transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(person.id)}
                        className="px-3 py-1 bg-purple-800 text-white rounded font-semibold hover:bg-purple-900 cursor-pointer transition"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-indigo-950 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-white mb-4">
              {editId ? "Editar Usuario" : "Nuevo Usuario"}
            </h2>

            <div className="mb-6 flex flex-col justify-center">
              <input
                type="text"
                placeholder="Nombre"
                className="p-3 w-full rounded-lg bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Apellido"
                className="p-3 mt-4 w-full rounded-lg bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.apellido}
                onChange={(e) =>
                  setFormData({ ...formData, apellido: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email"
                className="p-3 mt-4 w-full rounded-lg bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.correo}
                onChange={(e) =>
                  setFormData({ ...formData, correo: e.target.value })
                }
              />

              <div className="mt-4 relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className="p-3 w-full rounded-lg bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="mt-4 relative w-full">
                <input
                  type={showRePassword ? "text" : "password"}
                  placeholder="Confirmar Contraseña"
                  className="p-3 w-full rounded-lg bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                  value={formData.repassword}
                  onChange={(e) =>
                    setFormData({ ...formData, repassword: e.target.value })
                  }
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

            <div className="flex justify-center gap-2">
              <button
                onClick={handleAddOrUpdate}
                className="bg-purple-600 text-white px-6 py-2 hover:bg-purple-700 rounded-lg transition font-semibold"
              >
                {editId ? "Actualizar" : "Agregar"}
              </button>

              <button
                onClick={closeModal}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition font-semibold"
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
