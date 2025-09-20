import React, { useState, useEffect, useDebugValue } from "react";

function useCurrentTime() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useDebugValue(time, (t) => t.toLocaleTimeString());

  return time;
}

function Clock() {
  const currentTime = useCurrentTime();

  return (
    <div className="text-center space-y-4 max-w-sm mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800">Hora actual:</h2>
      <p className="text-xl text-gray-600 font-mono bg-gray-100 py-2 px-4 rounded-md">
        {currentTime.toLocaleTimeString()}
      </p>
      <a
        href="/"
        className="inline-block bg-gray-800 hover:bg-gray-900 text-white hover:text-gray-300 py-2 px-5 rounded-md transition-all duration-200"
      >
        Ir a Home
      </a>
    </div>
  );
}

export default Clock;
