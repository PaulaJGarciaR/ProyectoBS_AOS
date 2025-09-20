"use client";

import React from "react";
import { Link } from "react-router-dom";
import { useActionState } from "react";

async function fakeAction(prevState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return `Hola ${formData.get("name")}, formulario enviado ✅`;
}

function HookUseActionState() {
  const [state, formAction] = useActionState(fakeAction, null);

  return (
    <div className="container mx-auto px-4 flex justify-center">
      <div className="text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Ejemplo de useActionState</h2>

        <form action={formAction} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Escribe tu nombre"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Enviar
          </button>
        </form>

        {state && (
          <p className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
            {state}
          </p>
        )}

        <div className="flex flex-col space-y-3 mt-6">
          <Link
            to="/name-route"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
          >
            Ruta de ejemplo
          </Link>

          <a
            href="/"
            className="bg-gray-800 hover:bg-gray-900 text-white hover:text-gray-300 py-2 px-5 rounded-md transition-all duration-200 inline-block"
          >
            Ir a Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default HookUseActionState;
