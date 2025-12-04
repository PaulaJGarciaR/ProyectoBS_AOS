# Funcionalidad de Exportación a PDF

## Descripción General

Se implementó la funcionalidad de exportar en formato pdf para el historial de sesiones, se muestra una tabla con la información guardada en la plataforma.

## Características Implementadas

### 1. **Botón de Exportación**

- Su ubicación es en la parte superior derecha de la tabla de historial de sesiones.

### 2. **Estructura del Reporte PDF**

#### **Encabezado**

- Título del reporte
- Fecha de generación
- Información de filtros:
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

## Herramientas Utilizadas

### **Librerías Principales**

```
{
  "jspdf": "^3.0.4",
  "jspdf-autotable": "^5.0.2",
}
```

Instalación

```
npm install jspdf jspdf-autotable
```

### **Importaciones en el componente de historial de seiones**

```
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
```

### **Implementación del codigo**

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
