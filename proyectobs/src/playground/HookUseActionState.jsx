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
    <div className="container justify-content-center">
      <div className="text-center">
        <h2>Ejemplo de useActionState</h2>
        <form action={formAction}>
          <input
            type="text"
            name="name"
            placeholder="Escribe tu nombre"
            className="form-control my-2"
          />
          <button type="submit" className="btn btn-primary mt-3">
            Enviar
          </button>
        </form>

        {state && <p className="mt-3 alert alert-success">{state}</p>}

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

export default HookUseActionState;
