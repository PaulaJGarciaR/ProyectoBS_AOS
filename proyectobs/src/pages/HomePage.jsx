import React from "react";

function HomePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-950 px-4">
      <div className="w-full max-w-md sm:max-w-lg bg-indigo-900 shadow-lg rounded-xl p-6 sm:p-8">
        <h1 className="text-center text-3xl sm:text-4xl font-bold text-white mb-6">
          HomePage
        </h1>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="/login"
            className="w-full sm:w-auto bg-indigo-950 px-4 py-2 rounded-xl font-bold text-white hover:bg-indigo-800 text-center"
          >
            Login
          </a>
          <a
            href="/register"
            className="w-full sm:w-auto bg-indigo-950 px-4 py-2 rounded-xl font-bold text-white hover:bg-indigo-800 text-center"
          >
            Register
          </a>
          <a
            href="/hooks"
            className="w-full sm:w-auto bg-indigo-950 px-4 py-2 rounded-xl font-bold text-white hover:bg-indigo-800 text-center"
          >
            Hooks
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
