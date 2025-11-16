import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Clock, Mail, User, LogIn, LogOut, Calendar, RefreshCw, Search, Timer } from "lucide-react";

export default function SessionsTable() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const sessionsRef = collection(db, "sesiones");
      const q = query(sessionsRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);

      const sessionsData = await Promise.all(
        querySnapshot.docs.map(async (docSnap) => {
          const sessionData = docSnap.data();
          
          if (sessionData.provider === "password" && sessionData.userId) {
            try {
              const userRef = doc(db, "usuarios", sessionData.userId);
              const userDoc = await getDoc(userRef);
              
              if (userDoc.exists()) {
                const userData = userDoc.data();
                return {
                  id: docSnap.id,
                  ...sessionData,
                  displayName: `${userData.nombre || ""} ${userData.apellido || ""}`.trim() || sessionData.displayName || "Usuario",
                  photoURL: userData.photoURL || sessionData.photoURL || "",
                };
              }
            } catch (error) {
              console.error("Error al obtener datos del usuario:", error);
            }
          }
          
          return {
            id: docSnap.id,
            ...sessionData,
          };
        })
      );

      setSessions(sessionsData);
      console.log("📊 Sesiones cargadas:", sessionsData);
    } catch (error) {
      console.error("Error al obtener sesiones:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const calculateDuration = (loginTime, logoutTime) => {
    if (!loginTime) return "N/A";
    
    const start = new Date(loginTime);
    const end = logoutTime ? new Date(logoutTime) : new Date();
    
    const diffMs = end - start;
    
    if (diffMs < 0) return "N/A";
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const getProviderBadge = (provider) => {
    const badges = {
      google: "bg-red-100 text-red-800",
      github: "bg-gray-800 text-white",
      password: "bg-indigo-100 text-indigo-800",
      facebook: "bg-blue-100 text-blue-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          badges[provider] || "bg-gray-100 text-gray-800"
        }`}
      >
        {provider?.charAt(0).toUpperCase() + provider?.slice(1) || "Desconocido"}
      </span>
    );
  };

  // Aplicar filtros
  const filteredSessions = sessions.filter((session) => {
    // Filtro por provider
    const matchesProvider = filter === "all" || session.provider === filter;
    
    // Filtro por búsqueda
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      searchTerm === "" ||
      (session.displayName || "").toLowerCase().includes(searchLower) ||
      (session.email || "").toLowerCase().includes(searchLower) ||
      (session.provider || "").toLowerCase().includes(searchLower);
    
    return matchesProvider && matchesSearch;
  });

  const uniqueProviders = [...new Set(sessions.map((s) => s.provider))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-indigo-950 rounded-2xl shadow-xl p-6">
      <div className="flex flex-col gap-4 mb-6">
        {/* Header con título y botón recargar */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Historial de Sesiones
          </h2>
          <button
            onClick={fetchSessions}
            className="bg-indigo-700 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
            title="Recargar sesiones"
          >
            <RefreshCw className="w-4 h-4" />
            Recargar
          </button>
        </div>

        {/* Buscador */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, correo o método..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-indigo-900 text-white rounded-lg border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-indigo-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400 hover:text-white"
              title="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filtros por provider */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === "all"
                ? "bg-indigo-600 text-white"
                : "bg-indigo-800 text-indigo-200 hover:bg-indigo-700"
            }`}
          >
            Todos ({sessions.length})
          </button>
          {uniqueProviders.map((provider) => (
            <button
              key={provider}
              onClick={() => setFilter(provider)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors capitalize ${
                filter === provider
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-800 text-indigo-200 hover:bg-indigo-700"
              }`}
            >
              {provider} ({sessions.filter((s) => s.provider === provider).length})
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-indigo-800">
              <th className="pb-3 text-purple-400 font-semibold">
                <div className="flex items-center gap-2">
                  Usuario
                </div>
              </th>
              <th className="pb-3 text-purple-400 font-semibold">
                <div className="flex items-center gap-2">
                  Correo
                </div>
              </th>
              <th className="pb-3 text-purple-400 font-semibold">
                <div className="flex items-center gap-2">
                  Método
                </div>
              </th>
              <th className="pb-3 text-purple-400 font-semibold">
                <div className="flex items-center gap-2">
                  Fecha
                </div>
              </th>
              <th className="pb-3 text-purple-400 font-semibold">
                <div className="flex items-center gap-2">
                  Hora Entrada
                </div>
              </th>
              <th className="pb-3 text-purple-400 font-semibold">
                <div className="flex items-center gap-2">
                  Hora Salida
                </div>
              </th>
              <th className="pb-3 text-purple-400 font-semibold">
                <div className="flex items-center gap-2">
                  Duración
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-400">
                  {searchTerm ? 
                    `No se encontraron resultados para "${searchTerm}"` : 
                    "No hay sesiones registradas"
                  }
                </td>
              </tr>
            ) : (
              filteredSessions.map((session) => (
                <tr
                  key={session.id}
                  className="border-b border-indigo-900 hover:bg-indigo-900/30 transition-colors"
                >
                  <td className="py-4 text-white">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">
                        {session.displayName || "Usuario"}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-indigo-200">
                    {session.email || "N/A"}
                  </td>
                  <td className="py-4">{getProviderBadge(session.provider)}</td>
                  <td className="py-4 text-indigo-200">
                    {formatDate(session.timestamp)}
                  </td>
                  <td className="py-4 text-white font-medium">
                    {formatTime(session.loginTime)}
                  </td>
                  <td className="py-4 font-medium">
                    {session.logoutTime ? (
                      <span className="text-white">{formatTime(session.logoutTime)}</span>
                    ) : (
                      <span className="text-green-400 flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        Activa
                      </span>
                    )}
                  </td>
                  <td className="py-4 font-medium">
                    {session.logoutTime ? (
                      <span className="text-indigo-200">
                        {calculateDuration(session.loginTime, session.logoutTime)}
                      </span>
                    ) : (
                      <span className="text-yellow-400 flex items-center gap-1">
                        <Timer className="w-3 h-3" />
                        {calculateDuration(session.loginTime, null)}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-indigo-300 flex justify-between items-center">
        <span>
          Mostrando {filteredSessions.length} de {sessions.length} sesiones
        </span>
        {searchTerm && (
          <span className="text-indigo-400">
            Filtrando por: "{searchTerm}"
          </span>
        )}
      </div>
    </div>
  );
}