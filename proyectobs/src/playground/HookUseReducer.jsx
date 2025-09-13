import React, { useReducer } from 'react';
const initialState = { name: '', age: 0, submitted: false };
const formReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_AGE':
            return { ...state, age: action.payload };
        case 'SUBMIT':
            return { ...state, submitted: true };
        default:
            return state;
    }
};
function Form() {
    const [state, dispatch] = useReducer(formReducer, initialState);

    const handleSubmit = () => {
        dispatch({ type: 'SUBMIT' });
    };
    return (
    <div className='rounded'>
        <div className='bg-primary-subtle p-4 d-flex flex-column rounded'>
            <input
                type="text"
                value={state.name}
                onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
                placeholder="Enter your name"
                className='my-2 bg-white border-0 text-black'
            />
            <input
                type="number"
                value={state.age}
                onChange={(e) => dispatch({ type: 'SET_AGE', payload: e.target.value })}
                placeholder="Enter your age"
                className='my-2 bg-white border-0 text-black'
            />
            <button onClick={handleSubmit} className='bg-secondary text rounded mt-4'>Enviar</button>
            {state.submitted && <p>Formulario Enviado!</p>}
        </div>
         <a href="/" className='list-group-item bg-dark text-white link-secondary mt-4 py-2 px-5 rounded'>Ir a Home</a>
    </div>
        
    );
}
export default Form;