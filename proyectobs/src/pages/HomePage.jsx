import React from "react";

function HomePage() {
  return (
    <div className="flex justify-center items-center h-screen bg-indigo-950">
      <div className="w-[50%] bg-indigo-900  shadow rounded">
        <h1 className="text-center my-6 text-3xl font-bold text-white">HomePage</h1>
        <div className="flex justify-center pb-4">
          <a href="/login" className="mr-4 bg-indigo-950 px-4 py-2 rounded-xl font-bold cursor-pointer hover:bg-indigo-800 text-white">Login</a>
          <a href="/register" className="mr-4 bg-indigo-950 px-4 py-2 rounded-xl font-bold cursor-pointer hover:bg-indigo-800 text-white">Register</a>
          <a href="/hooks" className="bg-indigo-950 px-4 py-2 rounded-xl font-bold cursor-pointer hover:bg-indigo-800 text-white">Hooks</a>
          {/* <a href="/dashboard" className="bg-indigo-400 px-4 py-2 rounded-xl font-bold cursor-pointer hover:bg-indigo-500">Dashboard</a>
          <a href="/changepassword" className="bg-indigo-400 px-4 py-2 rounded-xl font-bold cursor-pointer hover:bg-indigo-500">Change Password</a> */}

        </div>
      </div>
    </div>
  );
}

export default HomePage;
