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
    <div className="container justify-content-center">
      <div className="text-center">
        <h2>Ejemplo de useFormStatus</h2>
        <form action={onSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Escribe tu nombre"
            className="form-control my-2"
          />
          <SubmitButton />
        </form>

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
  );
}

export default HookUseFormStatus;
