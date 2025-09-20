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
    <div className="p-5 text-center max-w-md mx-auto">
      {usuario ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Bienvenido, {usuario.nombre} 👋
          </h2>
          <p className="text-lg text-gray-600">
            Rol: <span className="font-medium text-gray-800">{usuario.rol}</span>
          </p>
          <button 
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            No has iniciado sesión
          </h2>
          <button 
            onClick={login}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
          >
            Iniciar sesión
          </button>
        </div>
      )}

      {/* Enlace para ir a Home */}
      <a
        href="/"
        className="inline-block bg-gray-800 hover:bg-gray-900 text-white hover:text-gray-300 mt-6 py-2 px-5 rounded-md transition-all duration-200"
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