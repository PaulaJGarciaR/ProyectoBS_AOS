# Funcionalidad de Exportación a PDF y Excel

## Descripción General

Se implementó la funcionalidad de exportar en formato pdf y en en formato de excel, para cada uno de los módulos de la paltaforma del proyecto, en cada reporte se muestra una tabla con la información guardada en la plataforma.

## Herramientas Utilizadas

### **Librerías Principales**

```
{
  "jspdf": "^3.0.4",
  "jspdf-autotable": "^5.0.2",
  "xlsx": "^0.18.5"
}
```

### **Instalación**

```
npm install jspdf jspdf-autotable
```

```
npm install xlsx
```

## Componente de Usuarios

### Características Implementadas

#### 1. **Botón de Exportación**

- Su ubicación es en la parte superior derecha de la tabla del módulo de usuarios.

#### 2. **Estructura del Reporte PDF**

#### **Encabezado para el archivo pdf**

- Título del reporte
- Fecha de generación

#### **Tabla de Datos**

La tabla incluye las siguientes columnas:

- Nombre
- Apellido
- Email 
- Rol
- Estado
- Método de Acceso

#### 3. **Estructura del Reporte en Excel**

#### **Tabla de Datos**

La tabla incluye las siguientes columnas:

- Nombre
- Apellido
- Email 
- Rol
- Estado
- Método de Acceso


### **Implementación del codigo**


```
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

```

#### **Función Principal exportar en formato Pdf**

```
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
```

#### **Función Principal exportar en formato excel**

```
 const exportToExcel = () => {
    // Preparar datos para Excel
    const excelData = usuarios.map((usuario) => ({
      Nombre: usuario.nombre || "Usuario",
      Apellido: usuario.apellido || "",
      Email: usuario.correo || "N/A",
      Rol: usuario.rol || "visitante",
      Estado: usuario.estado || "pendiente",
      Método: usuario.metodo || "password",
      "Fecha de Creación": usuario.creado
        ? new Date(usuario.creado.seconds * 1000).toLocaleDateString("es-ES")
        : "N/A",
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
      { wch: 18 }, // Fecha
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
```


#### **Botones de implementación**

```
  <button
    onClick={exportToPDF}
    className="bg-red-600 hover:bg-red-700 cursor-pointer font-semibold text-white py-2 rounded-lg flex items-center gap-2 transition"
    title="Exportar a PDF"
  >
      <span className="hidden sm:inline">Exportar PDF</span>
  </button>

  <button
    onClick={exportToExcel}
    className="bg-green-600 hover:bg-green-700 cursor-pointer font-semibold text-white py-2 rounded-lg flex items-center gap-2 transition"
    title="Exportar a Excel"
  >
    <span className="hidden sm:inline">Exportar Excel</span>
  </button>
```

## Componente de historial de sesiones

### 1. **Botón de Exportación**

- Su ubicación es en la parte superior derecha de la tabla del módulo de historial de sesiones.

### 2. **Estructura del Reporte PDF**

#### **Encabezado para el archivo pdf**

- Título del reporte
- Fecha de generación
- Información de filtros (en caso del módulo de historial de usuarios ):
  - Total de sesiones incluidas en el reporte
  - Filtro aplicado por método de autenticación

#### **Tabla de Datos**

La tabla incluye las siguientes columnas:

- Usuario
- Correo Electronico
- Método de Acceso
- Fecha de ingreso
- Hora Entrada
- Hora Salida o estado "Activa" si la sesión está en curso
- Duración

### **Implementación del codigo**


```
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
```

Función Principal

```
  const exportToPDF = () => {
    setExporting(true);

    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      });

      // Configuración de colores
      const primaryColor = [79, 70, 229];
      const secondaryColor = [99, 102, 241];

      // Encabezado del PDF
      const currentDate = new Date().toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });

      // Título principal
      doc.setFontSize(20);
      doc.setTextColor(...primaryColor);
      doc.setFont("helvetica", "bold");
      doc.text("Reporte de Historial de Sesiones", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });

      // Fecha de generación
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.setFont("helvetica", "normal");
      doc.text(`Fecha de generación: ${currentDate}`, doc.internal.pageSize.getWidth() / 2, 28, { align: "center" });

      // Información adicional
      doc.setFontSize(9);
      doc.text(`Total de sesiones: ${filteredSessions.length}`, 14, 38);
      if (filter !== "all") {
        doc.text(`Filtrado por: ${filter}`, 14, 43);
      }
      if (searchTerm) {
        doc.text(`Búsqueda: "${searchTerm}"`, 14, filter !== "all" ? 48 : 43);
      }

      // Preparar datos para la tabla
      const tableData = filteredSessions.map((session) => [
        session.displayName || "Usuario",
        session.email || "N/A",
        session.provider?.charAt(0).toUpperCase() + session.provider?.slice(1) || "Desconocido",
        formatDate(session.timestamp),
        formatTime(session.loginTime),
        session.logoutTime ? formatTime(session.logoutTime) : "Activa",
        session.logoutTime
          ? calculateDuration(session.loginTime, session.logoutTime)
          : calculateDuration(session.loginTime, null) + " (activa)"
      ]);

      // Configuración de la tabla
      autoTable(doc, {
        startY: filter !== "all" || searchTerm ? 53 : 48,
        head: [["Usuario", "Correo", "Método", "Fecha", "Hora Entrada", "Hora Salida", "Duración"]],
        body: tableData,
        theme: "striped",
        headStyles: {
          fillColor: primaryColor,
          textColor: [255, 255, 255],
          fontStyle: "bold",
          fontSize: 9,
          halign: "center"
        },
        bodyStyles: {
          fontSize: 8,
          textColor: [50, 50, 50]
        },
        alternateRowStyles: {
          fillColor: [245, 247, 250]
        },
        columnStyles: {
          0: { cellWidth: 35 },
          1: { cellWidth: 50 },
          2: { cellWidth: 25, halign: "center" },
          3: { cellWidth: 30, halign: "center" },
          4: { cellWidth: 30, halign: "center" },
          5: { cellWidth: 30, halign: "center" },
          6: { cellWidth: 35, halign: "center" }
        },
        margin: { top: 10, left: 14, right: 14 },
        styles: {
          overflow: "linebreak",
          cellPadding: 3
        }
      });

      // Pie de página
      const pageCount = doc.internal.getNumberOfPages();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(
          `Página ${i} de ${pageCount}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: "center" }
        );
      }

      // Guardar el PDF
     const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const fileName = `Reporte_Sesiones_${year}-${month}-${day}.pdf`;
      doc.save(fileName);

      console.log("PDF generado exitosamente");
    } catch (error) {
      console.error("Error al generar PDF:", error);
      alert("Error al generar el PDF. Por favor, intenta nuevamente.");
    } finally {
      setExporting(false);
    }
  };
```

Botón de implementación

```
  <button
    onClick={exportToPDF}
    disabled={exporting || filteredSessions.length === 0}
    className="bg-red-500 hover:bg-red-600 cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
    title="Exportar a Pdf"
        >
        {exporting ? "Generando..." : "Exportar Pdf"}
    </button>
```