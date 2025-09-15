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
    <div>
      <div className="mi-caja">Caja con estilo dinámico</div>
      <button onClick={() => setColor("teal")}>Cambiar a Teal</button>
      <button onClick={() => setColor("crimson")}>Cambiar a Rojo</button>

      {/* Enlace para ir a Home */}
      <a
        href="/"
        className="list-group-item bg-dark text-white link-secondary mt-4 py-2 px-5 rounded"
      >
        Ir a Home
      </a>
    </div>
  );
}

export default ComponenteConEstilos;
