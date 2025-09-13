import React, { useImperativeHandle, forwardRef, useRef } from 'react';

const InputConFocus = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus(); 
    }
  }));

  return <input ref={inputRef} type="text" className='bg-white border-0 text-black' />;
});

const ComponentePadre = () => {
  const ref = useRef();

  return (
    <div>
        <div className='d-flex flex-column bg-primary-subtle p-4 rounded'>
      <InputConFocus ref={ref}/>
      <button onClick={() => ref.current.focus()} className='mt-4 bg-secondary rounded'>
        Enfocar el input
      </button>
    </div>
    <a href="/" className='list-group-item bg-dark text-white link-secondary mt-4 py-2 px-5 rounded'>Ir a Home</a>
    </div>
    
  );
};

export default ComponentePadre;