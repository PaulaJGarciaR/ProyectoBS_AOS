import React, { useInsertionEffect, useState } from "react";

function ComponenteConEstilos() {
  const [color, setColor] = useState("purple");

  useInsertionEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .mi-caja {
        background-color: ${color};
        color: white;
        padding: 20px;
        text-align: center;
        border-radius: 10px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [color]);

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <div className="mi-caja">Caja con estilo dinámico</div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <button 
          onClick={() => setColor("teal")}
          className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Cambiar a Teal
        </button>
        <button 
          onClick={() => setColor("crimson")}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Cambiar a Rojo
        </button>
      </div>

      {/* Enlace para ir a Home */}
      <a
        href="/"
        className="inline-block bg-gray-800 hover:bg-gray-900 text-white hover:text-gray-300 py-2 px-5 rounded-md transition-all duration-200 text-center w-full"
      >
        Ir a Home
      </a>
    </div>
  );
}

export default ComponenteConEstilos;