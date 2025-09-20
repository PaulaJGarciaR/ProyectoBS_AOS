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
    <div className="text-center p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        Contador Global con useSyncExternalStore
      </h2>

      <p className="text-4xl font-bold my-5 text-blue-600">{contador}</p>

      <div className="flex gap-2 justify-center mb-6">
        <button
          onClick={increment}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Incrementar
        </button>
        <button
          onClick={decrement}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Decrementar
        </button>
        <button
          onClick={reset}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Ir a Home */}
      <a
        href="/"
        className="inline-block bg-gray-800 text-white hover:bg-gray-700 mt-4 py-2 px-5 rounded text-center no-underline transition-colors"
      >
        Ir a Home
      </a>
    </div>
  );
}

export default ContadorGlobal;
