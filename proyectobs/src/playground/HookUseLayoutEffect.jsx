import React, { useState, useRef, useLayoutEffect } from "react";

function Componente() {
  const [ancho, setAncho] = useState(0);
  const divRef = useRef(null);

  useLayoutEffect(() => {
    if (divRef.current) {
      setAncho(divRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center">
        
      </div>
      <div
        ref={divRef}
        className="w-1/2 h-24 bg-purple-600 text-white text-center leading-24 rounded-lg"
      >
        Caja
      </div>
      <p className="mt-4 text-gray-700">El ancho de la caja es: {ancho}px</p>

      {/* ir a Home */}
      <a
        href="/"
        className="inline-block bg-gray-800 text-white hover:bg-gray-700 mt-4 py-2 px-5 rounded no-underline transition-colors"
      >
        Ir a Home
      </a>
    </div>
  );
}

export default Componente;
