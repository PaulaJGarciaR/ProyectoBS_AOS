import { useState, useRef, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const previousCountRef = useRef(count); // Store previous count in a ref

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
    previousCountRef.current = count; // Update the ref
  }, [count]); // Run the effect only when count changes

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)} className="rounded bg-secondary mt-2 py-2 px-5">Incremento</button>
      <a href="/" className="list-group-item bg-dark text-white link-secondary mt-2 py-2 px-5 rounded">
        Ir a Home
      </a>
    </div>
  );
}

export default Counter;
