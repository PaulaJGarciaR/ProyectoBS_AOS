import { useState } from "react";
import UsersPage from "../components/UsersPage"; 
import StaffPage from "../components/StaffPage";
import ProductsPage from "../components/ProductsPage";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div className="flex h-screen bg-indigo-950">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold">Mi Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveSection("home")}
            className={`block w-full text-left py-2 px-4 rounded ${
              activeSection === "home" ? "bg-indigo-400" : "hover:bg-indigo-300"
            }`}
          >
            🏠 Inicio
          </button>
          <button
            onClick={() => setActiveSection("users")}
            className={`block w-full text-left py-2 px-4 rounded ${
              activeSection === "users" ? "bg-indigo-400" : "hover:bg-indigo-300"
            }`}
          >
            👤 Usuarios
          </button>
          <button
            onClick={() => setActiveSection("staff")}
            className={`block w-full text-left py-2 px-4 rounded ${
              activeSection === "staff" ? "bg-indigo-400" : "hover:bg-indigo-300"
            }`}
          >
            👥 Staff
          </button>
          <button
            onClick={() => setActiveSection("products")}
            className={`block w-full text-left py-2 px-4 rounded ${
              activeSection === "products"
                ? "bg-indigo-400"
                : "hover:bg-indigo-300"
            }`}
          >
            📦 Productos
          </button>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button className="w-full py-2 px-4 bg-indigo-400 rounded hover:bg-indigo-600">
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-900 shadow p-4 flex justify-between items-center text-white">
          <h1 className="text-xl font-bold">
            {activeSection === "home" && "Panel de Control"}
            {activeSection === "users" && "Gestión de Usuarios"}
            {activeSection === "staff" && "Gestión de Staff"}
            {activeSection === "products" && "Gestión de Productos"}
          </h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Buscar..."
              className="px-3 py-1 rounded bg-gray-800 border border-purple-500 text-white placeholder-gray-400"
            />
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
              👤
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {activeSection === "home" && (
            <>
              {/* Tarjetas resumen con estilo morado */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-800 shadow rounded-2xl p-6 border border-purple-500">
                  <h2 className="text-lg font-semibold text-purple-400">Usuarios</h2>
                  <p className="text-3xl font-bold mt-2 text-white">1,234</p>
                </div>
                <div className="bg-gray-800 shadow rounded-2xl p-6 border border-purple-500">
                  <h2 className="text-lg font-semibold text-purple-400">Ingresos</h2>
                  <p className="text-3xl font-bold mt-2 text-white">$45,678</p>
                </div>
                <div className="bg-gray-800 shadow rounded-2xl p-6 border border-purple-500">
                  <h2 className="text-lg font-semibold text-purple-400">Pedidos</h2>
                  <p className="text-3xl font-bold mt-2 text-white">320</p>
                </div>
              </div>

              {/* Gráfica placeholder */}
              <div className="bg-gray-800 shadow rounded-2xl p-6 h-64 flex items-center justify-center border border-purple-500 text-purple-400">
                Aquí irá la gráfica 📊
              </div>
            </>
          )}

          {activeSection === "users" && <UsersPage />}
          {activeSection === "staff" && <StaffPage />}
          {activeSection === "products" && <ProductsPage />}
        </div>
      </main>
    </div>
  );
}
