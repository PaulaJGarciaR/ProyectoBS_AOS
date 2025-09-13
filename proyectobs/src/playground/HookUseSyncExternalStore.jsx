import React, { useSyncExternalStore } from "react";

let count = 0;
let listeners = new Set();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return count;
}

function increment() {
  count++;
  emitChange();
}

function decrement() {
  count--;
  emitChange();
}

function reset() {
  count = 0;
  emitChange();
}

function ContadorGlobal() {
  const contador = useSyncExternalStore(subscribe, getSnapshot);

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h2>🔥 Contador Global con useSyncExternalStore</h2>
      <p style={{ fontSize: "2rem", margin: "20px 0" }}>{contador}</p>
      <button onClick={increment} style={{ margin: "5px" }}>
        ➕ Incrementar
      </button>
      <button onClick={decrement} style={{ margin: "5px" }}>
        ➖ Decrementar
      </button>
      <button onClick={reset} style={{ margin: "5px" }}>
        🔄 Reset
      </button>

      {/* Ir a Home */}
      <a
        href="/"
        className="list-group-item bg-dark text-white link-secondary mt-4 py-2 px-5 rounded"
      >
        Ir a Home
      </a>
    </div>
  );
}

export default ContadorGlobal;
