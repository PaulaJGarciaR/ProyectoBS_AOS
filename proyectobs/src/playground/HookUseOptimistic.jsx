"use client"; // Solo si usas Next.js / React Server Components

import React, { useOptimistic } from "react";
import { Link } from "react-router-dom";

function HookUseOptimistic() {
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    0,
    (state, newCount) => state + newCount
  );

  function handleClick() {
    addOptimisticCount(1); // Suma optimista
  }

  return (
    <div className="container justify-content-center">
      <div className="text-center">
        <h2>Ejemplo de useOptimistic</h2>
        <div className="list-group">
          <p className="list-group-item">Contador optimista: {optimisticCount}</p>
          <button onClick={handleClick} className="btn btn-primary mt-3">
            Sumar +1
          </button>

          <Link to="/name-route" className="btn btn-success mt-3">
            Ruta de ejemplo
          </Link>

          <a
            href="/"
            className="list-group-item bg-dark text-white link-secondary mt-4 py-2 px-5 rounded"
          >
            Ir a Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default HookUseOptimistic;
