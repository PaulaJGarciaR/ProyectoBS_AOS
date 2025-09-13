import React, { useState, useMemo } from 'react';

function Example() {
  const [txt, setTxt] = useState("Algo de texto");
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const sum = useMemo(() => {
    console.log('Calculando suma...');
    return a + b;
  }, [a, b]);

  return (
    <div>
        <div className='bg-primary-subtle rounded'>
             <div>
            <p>Texto: {txt}</p>
            <p>a: {a}</p>
            <p>b: {b}</p>
            <p>sum: {sum}</p>
        </div>
        <div className='p-2'>
            <button className='mx-2 bg-secondary rounded' onClick={() => setTxt("Nuevo Texto!")}>Escribir Texto</button>
            <button className='mx-2 bg-secondary rounded' onClick={() => setA(a + 1)}>Incrementar a</button>
            <button className='mx-2 bg-secondary rounded' onClick={() => setB(b + 1)}>Incrementar b</button>
        </div>
        </div>
        <div className='d-flex justify-content-center'>
         <a href="/" className='list-group-item bg-dark text-white link-secondary mt-4 py-2 px-5 rounded w-50'>Ir a Home</a>
        </div>
        
    </div>
  );
}

export default Example;
