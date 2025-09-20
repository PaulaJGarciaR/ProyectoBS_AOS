import React, { useState, useCallback } from "react";

function ChildComponent({ onClick }) {
  console.log("ChildComponent se renderiza");
  return (
    <button className="bg-secondary mx-2 rounded" onClick={onClick}>
      Hazme clic
    </button>
  );
}

function Example() {
  const [count, setCount] = useState(0);
  const [txt, setTxt] = useState("Algo de texto…");

  const incrementCount = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="mb-2 text-gray-800">Texto: {txt}</p>
        <p className="mb-4 text-gray-800">Contador: {count}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors duration-200"
            onClick={() => setTxt("Nuevo texto!")}
          >
            Escribir Texto
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors duration-200"
            onClick={() => setCount((prev) => prev + 1)}
          >
            Incrementar
          </button>
        </div>

        <ChildComponent onClick={incrementCount} />
      </div>

      <div className="flex justify-center">
        <a
          href="/"
          className="bg-gray-800 hover:bg-gray-900 text-white hover:text-gray-300 mt-4 py-2 px-5 rounded w-1/2 text-center transition-all duration-200 inline-block"
        >
          Ir a Home
        </a>
      </div>
    </div>
  );
}

export default Example;
