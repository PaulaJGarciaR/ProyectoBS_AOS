export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Barra lateral */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Mi Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">🏠 Inicio</a>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">📊 Análisis</a>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">⚙️ Configuración</a>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button className="w-full py-2 px-4 bg-red-500 rounded hover:bg-red-600">
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 flex flex-col">
        {/* Barra superior */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Panel de Control</h1>
          <div className="flex items-center space-x-4">
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="px-3 py-1 border rounded"
            />
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          </div>
        </header>

        {/* Tarjetas */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-semibold">Usuarios</h2>
            <p className="text-2xl font-bold mt-2">1,234</p>
          </div>
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-semibold">Ingresos</h2>
            <p className="text-2xl font-bold mt-2">$45,678</p>
          </div>
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-semibold">Pedidos</h2>
            <p className="text-2xl font-bold mt-2">320</p>
          </div>
        </div>

        {/* Gráfica */}
        <div className="p-6">
          <div className="bg-white shadow rounded p-6 h-64 flex items-center justify-center text-gray-500">
            Aquí irá la gráfica 📊
          </div>
        </div>
      </main>
    </div>
  );
}
