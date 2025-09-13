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
    <div>
      <div
        ref={divRef}
        style={{
          width: "50%",
          height: "100px",
          background: "purple",
          color: "white",
          textAlign: "center",
          lineHeight: "100px",
          borderRadius: "10px"
        }}
      >
        Caja
      </div>
      <p>El ancho de la caja es: {ancho}px</p>

      {/* ir a Home */}
      <a
        href="/"
        className="list-group-item bg-dark text-white link-secondary mt-4 py-2 px-5 rounded"
      >
        Ir a Home
      </a>
    </div>
  );
}

export default Componente;
