import React from "react";

function HomePage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[50%] bg-indigo-100">
        <h1 className="text-center my-6 text-3xl font-bold">HomePage</h1>
        <div className="flex justify-evenly pb-4">
          <a href="/login" className="bg-indigo-400 px-4 py-2 rounded-xl font-bold cursor-pointer hover:bg-indigo-500">Login</a>
          <a href="/register" className="bg-indigo-400 px-4 py-2 rounded-xl font-bold cursor-pointer hover:bg-indigo-500">Register</a>
          <a href="/hooks" className="bg-indigo-400 px-4 py-2 rounded-xl font-bold cursor-pointer hover:bg-indigo-500">Hooks</a>
          <a href="/dashboard" className="bg-indigo-400 px-4 py-2 rounded-xl font-bold cursor-pointer hover:bg-indigo-500">Dashboard</a>
          <a href="/changepassword" className="bg-indigo-400 px-4 py-2 rounded-xl font-bold cursor-pointer hover:bg-indigo-500">Change Password</a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
