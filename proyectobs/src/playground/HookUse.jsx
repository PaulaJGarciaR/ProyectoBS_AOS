import React from "react";
import { Link } from "react-router-dom";

function HookUse() {
  return (
    <div className="container mx-auto px-4 flex justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Ejemplo de HookUse</h2>
        <div className="flex flex-col space-y-4 max-w-sm mx-auto">
          <Link
            to="/useState"
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded transition-colors duration-200"
          >
            Ir a useState
          </Link>

          <Link
            to="/name-route"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded transition-colors duration-200"
          >
            Ruta de ejemplo
          </Link>

          <a
            href="/"
            className="bg-gray-800 hover:bg-gray-900 text-white hover:text-gray-300 py-2 px-5 rounded transition-all duration-200 inline-block"
          >
            Ir a Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default HookUse;
