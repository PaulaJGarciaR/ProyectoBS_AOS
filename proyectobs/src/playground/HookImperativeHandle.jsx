import React, { useImperativeHandle, forwardRef, useRef } from "react";

const InputConFocus = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  return (
    <input
      ref={inputRef}
      type="text"
      className="bg-white border-0 text-black"
    />
  );
});

const ComponentePadre = () => {
  const ref = useRef();

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col bg-blue-100  p-4 rounded-lg w-[50%]">
          <InputConFocus ref={ref} />
          <button
            onClick={() => ref.current.focus()}
            className="mt-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors duration-200"
          >
            Enfocar el input
          </button>
          <div className="flex justify-center">
            <a
              href="/"
              className="w-[50%] text-center inline-block bg-gray-800 hover:bg-gray-900 text-white hover:text-gray-300 mt-4 py-2 px-5 rounded transition-all duration-200"
            >
              Ir a Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentePadre;
