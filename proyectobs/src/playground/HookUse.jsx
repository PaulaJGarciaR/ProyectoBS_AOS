import React from "react";
import { Link } from "react-router-dom";

function HookUse() {
  return (
    <div className="container justify-content-center">
      <div className="text-center">
        <h2>Ejemplo de HookUse</h2>
        <div className="list-group">
          <Link to="/useState" className="btn btn-danger">
            Ir a useState
          </Link>

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

export default HookUse;
