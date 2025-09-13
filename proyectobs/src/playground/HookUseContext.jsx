import React, { createContext, useContext, useState } from "react";

// 1. Crear el contexto
const UsuarioContext = createContext();

// 2. Crear un proveedor del contexto
function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  const login = () => setUsuario({ nombre: "Andrés", rol: "admin" });
  const logout = () => setUsuario(null);

  return (
    <UsuarioContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UsuarioContext.Provider>
  );
}

// 3. Componente que consume el contexto
function Perfil() {
  const { usuario, login, logout } = useContext(UsuarioContext);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {usuario ? (
        <>
          <h2>Bienvenido, {usuario.nombre} 👋</h2>
          <p>Rol: {usuario.rol}</p>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <h2>No has iniciado sesión</h2>
          <button onClick={login}>Iniciar sesión</button>
        </>
      )}

      {/* Enlace para ir a Home */}
      <a
        href="/"
        className="list-group-item bg-dark text-white link-secondary mt-4 py-2 px-5 rounded"
      >
        Ir a Home
      </a>
    </div>
  );
}

// 4. Usar el provider en el árbol principal
function App() {
  return (
    <UsuarioProvider>
      <Perfil />
    </UsuarioProvider>
  );
}

export default App;
