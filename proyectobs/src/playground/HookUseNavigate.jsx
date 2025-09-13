import React from "react";
import { Link,useNavigate } from "react-router-dom";

function HookUseNavigate(){
    const navigate = useNavigate();

    function GoRoute(){
        navigate('/useState')
    }
    return(
        <div className="container justify-content-center">
            <div className="text-center">
                <h2>Ejemplos de useNavigate</h2>
                <div className="list-group">
                    <button onClick={GoRoute} className="btn btn-danger">Ruta Navigate</button>
                    <Link to='name-route'>Ruta de ejemplo</Link>
                <a href="/" className='list-group-item bg-dark text-white link-secondary mt-4 py-2 px-5 rounded'>Ir a Home</a>
                </div>
            </div>
        </div>
    )

}

export default HookUseNavigate;