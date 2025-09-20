import React, { useReducer } from "react";

const initialState = { name: "", age: 0, submitted: false };

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_AGE":
      return { ...state, age: action.payload };
    case "SUBMIT":
      return { ...state, submitted: true };
    default:
      return state;
  }
};

function Form() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = () => {
    dispatch({ type: "SUBMIT" });
  };

  return (
    <div className="rounded-lg p-4">
      <div className="bg-blue-100 p-4 flex flex-col rounded-lg">
        <input
          type="text"
          value={state.name}
          onChange={(e) =>
            dispatch({ type: "SET_NAME", payload: e.target.value })
          }
          placeholder="Enter your name"
          className="my-2 bg-white border-0 text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          value={state.age}
          onChange={(e) =>
            dispatch({ type: "SET_AGE", payload: e.target.value })
          }
          placeholder="Enter your age"
          className="my-2 bg-white border-0 text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSubmit}
          className="bg-gray-500 hover:bg-gray-600 text-white rounded mt-4 py-2 px-4 transition-colors font-medium"
        >
          Enviar
        </button>
        {state.submitted && (
          <p className="mt-3 text-green-600 font-medium">Formulario Enviado!</p>
        )}
      </div>
      <a
        href="/"
        className="inline-block bg-gray-800 text-white hover:bg-gray-700 mt-4 py-2 px-5 rounded text-center no-underline transition-colors"
      >
        Ir a Home
      </a>
    </div>
  );
}

export default Form;
