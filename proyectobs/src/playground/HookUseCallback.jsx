import React, { useState, useCallback } from 'react';

function ChildComponent({ onClick }) {
  console.log('ChildComponent se renderiza');
  return (
    <button className='bg-secondary mx-2 rounded' onClick={onClick}>Hazme clic</button>
  );
}

function Example() {
  const [count, setCount] = useState(0);
  const [txt, setTxt] = useState("Algo de texto…");
  
  const incrementCount = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  return (
    <div>
        <div className='bg-primary-subtle p-4 rounded'>
            <p>Texto: {txt}</p>
      <p>Contador: {count}</p>
      
      <button className='mx-2 bg-secondary rounded' onClick={() => setTxt("Nuevo texto!")}>Escribir Texto</button>
      <button className='mx-2 bg-secondary rounded' onClick={() => setCount(prev => prev + 1)}>Incrementar</button>
      
      <ChildComponent onClick={incrementCount} />

        </div>
         <div className='d-flex justify-content-center'>
         <a href="/" className='list-group-item bg-dark text-white link-secondary mt-4 py-2 px-5 rounded w-50'>Ir a Home</a>
        </div>
      
    </div>
  );
}

export default Example;