import { useState, useTransition } from "react";

export default function BasicTransitionExample() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setInput(e.target.value);
    startTransition(() => {
      const newList = [];
      for (let i = 0; i < 10; i++) {
        newList.push(e.target.value + " - " + i);
      }
      setList(newList);
    });
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">useTransition Básico</h2>

      <input
        value={input}
        onChange={handleChange}
        placeholder="Escribe algo..."
        className="w-full p-2 border rounded mb-4 bg-blue-50 text-black border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {isPending && <p className="text-blue-600 mb-2">Generando lista...</p>}

      <div className="h-64 overflow-y-auto border border-gray-200 rounded p-2 mb-4">
        {list.slice(0, 50).map((item, i) => (
          <div key={i} className="p-1 border-b border-gray-100 last:border-b-0">
            {item}
          </div>
        ))}
        {list.length > 50 && (
          <div className="text-gray-500 p-1">
            ...y {list.length - 50} elementos más
          </div>
        )}
      </div>

      <a
        href="/"
        className="inline-block bg-gray-800 text-white hover:bg-gray-700 mt-4 py-2 px-5 rounded text-center no-underline transition-colors"
      >
        Ir a Home
      </a>
    </div>
  );
}
