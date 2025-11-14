import { useState } from "react";
import UsersPage from "../components/UsersPage";
import StaffPage from "../components/StaffPage";
import SessionsTable from "../components/SessionsTable.jsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { User } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import { collection, query, where, getDocs, updateDoc, doc,getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../playground/useAuth.js";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("home");

  const data = [
    { name: "Enero", value: 40 },
    { name: "Febrero", value: 55 },
    { name: "Marzo", value: 52 },
    { name: "Abril", value: 70 },
    { name: "Mayo", value: 65 },
    { name: "Junio", value: 85 },
  ];

    const [loading, setLoading] = useState(false);
const { user, userData, loading: authLoading } = useAuth();
  const auth = getAuth();
const navigate = useNavigate();

const handleLogout = async () => {
  const result = await Swal.fire({
    title: "¿Cerrar sesión?",
    text: "¿Estás seguro que deseas salir?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#4F46E5",
    cancelButtonColor: "#6B7280",
    confirmButtonText: "Sí, salir",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    setLoading(true);
    
    if (user?.uid) {
      try {
        const sessionsRef = collection(db, "sesiones");
        const allSessionsSnapshot = await getDocs(sessionsRef);
        let activeSessions = [];
        
        allSessionsSnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (!data.logoutTime) {
            activeSessions.push({
              id: docSnap.id,
              ...data
            });
          }
        });
        
        
        if (activeSessions.length > 0) {
          activeSessions.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
          const lastSession = activeSessions[0];
          
          const sessionRef = doc(db, "sesiones", lastSession.id);
          const logoutTime = new Date().toISOString();
          
          await updateDoc(sessionRef, {
            logoutTime: logoutTime,
          });
          
          const updatedDoc = await getDoc(sessionRef);
          if (updatedDoc.exists()) {
            const verifyData = updatedDoc.data();
          }
        } else {
          console.log(" No hay sesiones activas para cerrar");
        }
      } catch (error) {
        console.error("Error completo:", error);
        console.error("Código:", error.code);
        console.error("Mensaje:", error.message);
      }
    } else {
      console.log("No hay usuario autenticado");
    }
    
    
    try {
      await signOut(auth);
      
      await Swal.fire({
        icon: "success",
        title: "Sesión cerrada",
        text: "Has cerrado sesión exitosamente",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/login");
    } catch (error) {
      console.error(" Error en signOut:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo cerrar sesión. Intenta de nuevo.",
        confirmButtonColor: "#4F46E5",
      });
    } finally {
      setLoading(false);
    }
  }
};


  return (
    <div className="flex h-screen bg-indigo-900">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-950 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold">Mi Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveSection("home")}
            className={`block w-full text-left py-2 px-4 rounded ${
              activeSection === "home" ? "bg-indigo-900" : "hover:bg-indigo-800"
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => setActiveSection("users")}
            className={`block w-full text-left py-2 px-4 rounded ${
              activeSection === "users"
                ? "bg-indigo-900"
                : "hover:bg-indigo-800"
            }`}
          >
            Usuarios
          </button>
          <button
            onClick={() => setActiveSection("staff")}
            className={`block w-full text-left py-2 px-4 rounded ${
              activeSection === "staff"
                ? "bg-indigo-900"
                : "hover:bg-indigo-800"
            }`}
          >
            Staff
          </button>
          <button
            onClick={() => setActiveSection("sessions")}
            className={`block w-full text-left py-2 px-4 rounded ${
              activeSection === "sessions"
                ? "bg-indigo-900"
                : "hover:bg-indigo-800"
            }`}
          >
            Historial
          </button>
        </nav>
        
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-slate-900 shadow p-4 flex justify-between items-center text-white">
          <h1 className="text-xl font-bold">
            {activeSection === "home" && "Panel de Control"}
            {activeSection === "users" && "Gestión de Usuarios"}
            {activeSection === "staff" && "Gestión de Staff"}
            {activeSection === "sessions" && "Historial de Sesiones"}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center hover:border-2 cursor-pointer hover:border-indigo-600">
              <User />
            </div>
            <div className="text-right">
               <p className="font-semibold text-sm">
                {userData?.nombre && userData?.apellido 
                  ? `${userData.nombre} ${userData.apellido}`
                  : user?.displayName || "Usuario"}
              </p>
            </div>
            <div>
              <button 
              onClick={handleLogout}
              className="bg-indigo-900 px-4 py-2 rounded font-semibold hover:bg-indigo-800 cursor-pointer">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {activeSection === "home" && (
            <>
              {/* Tarjetas resumen con estilo morado */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-indigo-950 shadow rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-purple-400">
                    Usuarios
                  </h2>
                  <p className="text-3xl font-bold mt-2 text-white">1,234</p>
                </div>
                <div className="bg-indigo-950 shadow rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-purple-400">
                    Ingresos
                  </h2>
                  <p className="text-3xl font-bold mt-2 text-white">$45,678</p>
                </div>
                <div className="bg-indigo-950 shadow rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-purple-400">
                    Pedidos
                  </h2>
                  <p className="text-3xl font-bold mt-2 text-white">320</p>
                </div>
              </div>

              {/* Gráfica placeholder */}
              <div className="bg-indigo-950 shadow rounded-2xl p-6 flex items-center justify-center text-purple-400">
                <div className="w-full h-80 p-4 bg-slate-900 rounded-2xl shadow-xl">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Estadística
                  </h2>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" stroke="#fff" />
                      <YAxis stroke="#fff" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#6366f1"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {activeSection === "users" && <UsersPage />}
          {activeSection === "staff" && <StaffPage />}
           {activeSection === "sessions" && <SessionsTable />}
        </div>
      </main>
    </div>
  );
}
