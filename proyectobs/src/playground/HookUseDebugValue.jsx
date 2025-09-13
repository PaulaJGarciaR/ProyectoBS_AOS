import React, { useState, useEffect, useDebugValue } from 'react';

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
    <div>
      <h2>Hora actual:</h2>
      <p>{currentTime.toLocaleTimeString()}</p>
      <a href="/" className='list-group-item bg-dark text-white link-secondary  py-2 px-5 rounded'>Ir a Home</a>
    </div>
  );
}

export default Clock;