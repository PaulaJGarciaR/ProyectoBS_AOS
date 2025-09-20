import { useState, useRef, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const previousCountRef = useRef(count); 

  useEffect(() => {
    if (previousCountRef.current !== count) {
      console.log(
        "Count changed:",
        count,
        "(Previous:",
        previousCountRef.current,
        ")"
      );
    }
    previousCountRef.current = count; 
  }, [count]); 

  return (
    <div className="p-4 flex flex-col gap-4 max-w-md mx-auto items-center text-center">
      <p className="text-lg font-medium">Count: {count}</p>

      <button
        onClick={() => setCount(count + 1)}
        className="rounded bg-gray-500 hover:bg-gray-600 text-white mt-2 py-2 px-5 transition-colors font-medium"
      >
        Incremento
      </button>

      <a
        href="/"
        className="inline-block bg-gray-800 text-white hover:bg-gray-700 mt-2 py-2 px-5 rounded text-center no-underline transition-colors"
      >
        Ir a Home
      </a>
    </div>
  );
}

export default Counter;
