"use client"; 

import React, { useOptimistic } from "react";


function HookUseOptimistic() {
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    0,
    (state, newCount) => state + newCount
  );

  function handleClick() {
    addOptimisticCount(1); // Suma optimista
  }

  return (
    <div className="container mx-auto flex justify-center p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Ejemplo de useOptimistic</h2>
        <div className="flex flex-col gap-4 max-w-md">
          <p className="bg-gray-100 border border-gray-200 rounded px-4 py-3">
            Contador optimista: {optimisticCount}
          </p>
          
          <button 
            onClick={handleClick} 
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Sumar +1
          </button>

          <a 
            href="/name-route" 
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded text-center no-underline transition-colors"
          >
            Ruta de ejemplo
          </a>

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

export default HookUseOptimistic;