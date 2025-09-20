import React from "react";
import { Link, useNavigate } from "react-router-dom";

function HookUseNavigate() {
  const navigate = useNavigate();

  function GoRoute() {
    navigate("/useState");
  }
  return (
    <div className="container mx-auto flex justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Ejemplos de useNavigate</h2>
        <div className="flex flex-col gap-4 max-w-md">
          <button
            onClick={GoRoute}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Ruta Navigate
          </button>
          <Link
            to="name-route"
            className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors"
          >
            Ruta de ejemplo
          </Link>
          <a
            href="/"
            className="bg-gray-800 text-white hover:bg-gray-700 mt-4 py-2 px-5 rounded text-center no-underline transition-colors"
          >
            Ir a Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default HookUseNavigate;
