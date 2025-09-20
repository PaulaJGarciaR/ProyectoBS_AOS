import React, { useState, useMemo } from "react";

function Example() {
  const [txt, setTxt] = useState("Algo de texto");
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const sum = useMemo(() => {
    console.log("Calculando suma...");
    return a + b;
  }, [a, b]);

  return (
    <div className="p-4">
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="mb-4">
          <p className="mb-2">Texto: {txt}</p>
          <p className="mb-2">a: {a}</p>
          <p className="mb-2">b: {b}</p>
          <p className="mb-2">sum: {sum}</p>
        </div>
        <div className="p-2">
          <button
            className="mx-2 bg-gray-500 hover:bg-gray-600 text-white rounded px-3 py-2 transition-colors"
            onClick={() => setTxt("Nuevo Texto!")}
          >
            Escribir Texto
          </button>
          <button
            className="mx-2 bg-gray-500 hover:bg-gray-600 text-white rounded px-3 py-2 transition-colors"
            onClick={() => setA(a + 1)}
          >
            Incrementar a
          </button>
          <button
            className="mx-2 bg-gray-500 hover:bg-gray-600 text-white rounded px-3 py-2 transition-colors"
            onClick={() => setB(b + 1)}
          >
            Incrementar b
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <a
          href="/"
          className="inline-block bg-gray-800 text-white hover:bg-gray-700 mt-4 py-2 px-5 rounded w-1/2 text-center no-underline transition-colors"
        >
          Ir a Home
        </a>
      </div>
    </div>
  );
}

export default Example;
