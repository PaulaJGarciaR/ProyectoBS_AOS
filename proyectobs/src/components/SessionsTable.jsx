import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Clock, Mail, User, LogIn, LogOut, Calendar, RefreshCw } from "lucide-react";

export default function SessionsTable() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

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

  const filteredSessions = sessions.filter((session) => {
    if (filter === "all") return true;
    return session.provider === filter;
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
    <div className="bg-indigo-950 rounded-2xl shadow-xl p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          Historial de Sesiones
        </h2>
        <div className="flex gap-2 items-center w-full sm:w-auto">
          <button
            onClick={fetchSessions}
            className="bg-indigo-700 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
            title="Recargar sesiones"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="sm:inline">Recargar</span>
          </button>
        </div>
      </div>

      {/* Tabla - Desktop */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-indigo-800">
              <th className="pb-3 text-purple-400 font-semibold">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Usuario
                </div>
              </th>
              <th className="pb-3 text-purple-400 font-semibold">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Correo
                </div>
              </th>
              <th className="pb-3 text-purple-400 font-semibold">
                <div className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Método
                </div>
              </th>
              <th className="pb-3 text-purple-400 font-semibold">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Fecha
                </div>
              </th>
              <th className="pb-3 text-purple-400 font-semibold">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Hora Entrada
                </div>
              </th>
              <th className="pb-3 text-purple-400 font-semibold">
                <div className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Hora Salida
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-400">
                  No hay sesiones registradas
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
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Activa
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile & Tablet */}
      <div className="lg:hidden space-y-4">
        {filteredSessions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No hay sesiones registradas
          </div>
        ) : (
          filteredSessions.map((session) => (
            <div key={session.id} className="bg-indigo-900/30 rounded-lg p-4 border border-indigo-800">
              <div className="space-y-3">
                {/* Usuario */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-400 text-sm">
                    <User className="w-4 h-4" />
                    <span>Usuario</span>
                  </div>
                  <span className="text-white font-semibold text-right">
                    {session.displayName || "Usuario"}
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-400 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>Correo</span>
                  </div>
                  <span className="text-indigo-200 text-right break-all text-sm">
                    {session.email || "N/A"}
                  </span>
                </div>

                {/* Método */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-400 text-sm">
                    <LogIn className="w-4 h-4" />
                    <span>Método</span>
                  </div>
                  {getProviderBadge(session.provider)}
                </div>

                {/* Fecha */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Fecha</span>
                  </div>
                  <span className="text-indigo-200 text-right">
                    {formatDate(session.timestamp)}
                  </span>
                </div>

                {/* Hora Entrada */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-400 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Hora Entrada</span>
                  </div>
                  <span className="text-white font-medium text-right">
                    {formatTime(session.loginTime)}
                  </span>
                </div>

                {/* Hora Salida */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-400 text-sm">
                    <LogOut className="w-4 h-4" />
                    <span>Hora Salida</span>
                  </div>
                  {session.logoutTime ? (
                    <span className="text-white font-medium text-right">
                      {formatTime(session.logoutTime)}
                    </span>
                  ) : (
                    <span className="text-green-400 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Activa
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 text-sm text-indigo-300">
        Mostrando {filteredSessions.length} de {sessions.length} sesiones
      </div>
    </div>
  );
}