import { useId } from "react";

export default function BasicUseId() {
  const id = useId();

  return (
    <div className="p-6 max-w-sm mx-auto flex flex-col">
      <label htmlFor={id} className="block mb-2">
        Nombre:
      </label>
      <input
        id={id}
        type="text"
        className="w-full p-2 border rounded bg-blue-50 text-black"
      />

      <p className="mt-4 text-sm text-gray-600">
        El ID generado es:{" "}
        <code className="bg-gray-100 px-1 rounded">{id}</code>
      </p>
      <a
        href="/"
        className="bg-gray-800 text-white hover:bg-gray-700 mt-4 py-2 px-5 rounded text-center no-underline transition-colors"
      >
        Ir a Home
      </a>
    </div>
  );
}
