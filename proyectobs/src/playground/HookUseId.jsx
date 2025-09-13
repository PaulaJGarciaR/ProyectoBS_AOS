import { useId } from 'react';

export default function BasicUseId() {
  const id = useId();
  
  return (
    <div className="p-6 max-w-sm mx-auto d-flex flex-column">
      <label htmlFor={id} className="block mb-2">
        Nombre:
      </label>
      <input 
        id={id}
        type="text" 
        className="w-full p-2 border rounded bg-primary-subtle text-black"
      />
      
      <p className="mt-4 text-sm text-gray-600">
        El ID generado es: <code className="bg-gray-100 px-1">{id}</code>
      </p>
        <a href="/" className='list-group-item bg-dark text-white link-secondary mt-4 py-2 px-5 rounded'>Ir a Home</a>
    </div>
  );
}