import React from "react";

function ForgotPassword() {
  return (
    <div className="h-screen bg-indigo-950">
      <div className="flex justify-center items-center h-screen">
        <div className="w-[40%]  shadow-inner bg-white rounded-lg">
          <h1 className="text-2xl text-indigo-700 font-bold py-4 text-center">
            ¿Olvidaste tu Contraseña?
          </h1>
          <div className="flex justify-center">
            <div className="w-[90%]">
              <div className="w-full">
                <label htmlFor="" className="text-indigo-900 text-sm font-bold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="mt-2 p-3 w-full rounded-lg bg-[#D6DEE3]/40 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>
              <div className="flex justify-center items-center mx-8 my-6">
                <button className="bg-indigo-800 px-6 py-3 rounded-lg font-semibold text-white hover:bg-indigo-600 cursor-pointer w-full">
                  Recuperar Contraseña
                </button>
              </div>
              <div className="flex justify-center">
                <a href="/login" className="text-indigo-800 font-semibold mb-4 underline">Volver a login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
