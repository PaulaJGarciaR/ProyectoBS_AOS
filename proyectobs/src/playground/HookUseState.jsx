import { useState } from "react";

function Contador() {
  const [count, setCount] = useState(0);

  // function aumentar(){
  //     setCount(count+1);
  // }
  // function disminuir(){
  //     setCount(count-1);
  // }

  return (
    <>
      <div className="container mx-auto text-center p-4 max-w-md">
        <h1 className="text-3xl font-bold mb-6">Contador: {count}</h1>

        <div className="flex gap-2 justify-center mb-6">
          {/* <button onClick={aumentar} className="btn btn-success ml-2">Aumentar</button>
                    <button onClick={disminuir} className="btn btn-warning">Disminuir</button> */}

          <button
            onClick={() => setCount(count + 1)}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Aumentar
          </button>
          <button
            onClick={() => setCount(count - 1)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Disminuir
          </button>
        </div>

        <a
          href="/"
          className="inline-block bg-gray-800 text-white hover:bg-gray-700 mt-4 py-2 px-5 rounded text-center no-underline transition-colors"
        >
          Ir a Home
        </a>
      </div>
    </>
  );
}

export default Contador;
