import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
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
    doc.text("Reporte de Staff", doc.internal.pageSize.getWidth() / 2, 20, {
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
    const tableData = staff.map((person) => [
      person.name || "Sin nombre",
      person.email || "N/A",
      person.role || "Sin cargo",
    ]);

    // Generar tabla usando autoTable importado
    autoTable(doc, {
      startY: 38,
      head: [["Nombre", "Email", "Cargo"]],
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
        `Total de staff: ${staff.length} | Página ${i} de ${pageCount}`,
        14,
        doc.internal.pageSize.height - 10
      );
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const fileName = `Reporte_Staff_${year}-${month}-${day}.pdf`;
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
    const excelData = staff.map((person) => ({
      Nombre: person.name || "Sin nombre",
      Email: person.email || "N/A",
      Cargo: person.role || "Sin cargo",
    }));

    // Crear libro de trabajo
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();

    // Ajustar ancho de columnas
    const columnWidths = [
      { wch: 20 }, // Nombre
      { wch: 30 }, // Email
      { wch: 20 }, // Cargo
    ];
    worksheet["!cols"] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Staff");

    // Descargar el archivo
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    XLSX.writeFile(workbook, `Reporte_Staff_${year}-${month}-${day}.xlsx`);

    Swal.fire({
      icon: "success",
      title: "Excel Generado",
      text: "El archivo Excel se ha descargado correctamente",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-400">CRUD Staff</h2>
        <div className="flex gap-2">
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
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        {editId ? "Actualizar Staff" : "Agregar Staff"}
      </button>

      {/* Tabla */}
      <table className="w-full mt-6 border-collapse">
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
              <td className="p-2 border border-purple-500 flex gap-2">
                <button
                  onClick={() => handleEdit(person)}
                  className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(person.id)}
                  className="px-3 py-1 bg-purple-800 text-white rounded hover:bg-purple-900"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default StaffCRUD;
