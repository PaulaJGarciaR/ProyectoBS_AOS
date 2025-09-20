"use client";

import React from "react";
import { Link } from "react-router-dom";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn btn-primary mt-3">
      {pending ? "Enviando..." : "Enviar"}
    </button>
  );
}

function HookUseFormStatus() {
  async function onSubmit(formData) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula delay
    console.log("Datos enviados:", formData.get("name"));
  }

  return (
    <div className="container mx-auto px-4 flex justify-center">
      <div className="text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Ejemplo de useFormStatus</h2>

        <form action={onSubmit} className="space-y-4 mb-6">
          <input
            type="text"
            name="name"
            placeholder="Escribe tu nombre"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
          <SubmitButton />
        </form>

        <div className="flex flex-col space-y-3">
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

export default HookUseFormStatus;
