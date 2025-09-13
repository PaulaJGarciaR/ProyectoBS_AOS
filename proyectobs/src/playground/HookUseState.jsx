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
      <div className="container text-center ">
        <h1>Contador:{count}</h1>
        <div className="btn-group">
            {/* <button onClick={aumentar} className="btn btn-success ml-2">Aumentar</button>
            <button onClick={disminuir} className="btn btn-warning">Disminuir</button> */}

            <button onClick={()=> setCount(count+1)} className="btn btn-success">Aumentar</button>
            <button onClick={()=> setCount(count-1)} className="btn btn-warning">Disminuir</button>
        </div>
        <a href="/" className='list-group-item bg-dark text-white link-secondary mt-4 py-2 px-5 rounded'>Ir a Home</a>
      </div>
        
      </>
    )
  }
export default Contador;