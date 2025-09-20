import React from "react";

function RegisterPage() {
  return (
    <div className="h-screen bg-indigo-950">
      <div className="flex justify-center items-center h-screen">
        <div className="w-[100%] flex justify-center shadow-inner">
          {/* Imagen lado izquierdo */}
          <div className="w-[55%] flex justify-end shadow-inner">
            <img
              className="rounded-l-2xl"
              src="https://cubiko.co/wp-content/uploads/2023/01/course-9.jpg"
              alt="Imagen de registro"
            />
          </div>

          {/* Formulario lado derecho */}
          <div className="w-[40%] bg-white rounded-r-2xl">
            <div className="mt-6">
              <h1 className="text-4xl font-bold text-center text-indigo-700">
                Regístrate
              </h1>
            </div>
            <form className="w-[100%]" action="">
              <div className="flex justify-center">
                <div className="w-[80%]">
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    className="mt-10 p-3 w-full rounded-lg bg-[#D6DEE3]/40 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="mt-6 p-3 w-full rounded-lg bg-[#D6DEE3]/40 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="mt-6 p-3 w-full rounded-lg bg-[#D6DEE3]/40 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                  <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    className="mt-6 p-3 w-full rounded-lg bg-[#D6DEE3]/40 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
              </div>

              <div className="flex justify-center items-center m-8">
                <button className="bg-indigo-800 px-6 py-3 rounded-xl font-bold text-white hover:bg-indigo-600 cursor-pointer">
                  Crear cuenta
                </button>
              </div>

              <div className="flex justify-center mb-6">
                <h1>¿Ya tienes cuenta?</h1>
                <a
                  href=""
                  className="ml-2 text-indigo-800 font-bold underline"
                >
                  Inicia sesión
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
