import React from "react";

function HomeHooks() {
  return (
    <div className="container mx-auto px-4 flex justify-center">
      <div className="text-center max-w-7xl">
        <h2 className="text-2xl font-bold mb-6">Ejemplos de Hooks</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 font-semibold">Hook</th>
                <th className="px-6 py-3 font-semibold">Ruta</th>
                <th className="px-6 py-3 font-semibold">Descripción</th>
                <th className="px-6 py-3 font-semibold">Categoría</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">UseDebugValue</th>
                <td className="px-6 py-4">
                  <a
                    href="/useDebugValue"
                    className="text-red-600 opacity-75 hover:text-red-800 hover:opacity-100 transition-all duration-200"
                  >
                    Ir a UseDebugValue
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  Permite añadir una etiqueta a un Hook personalizado en las
                  herramientas de desarrollo de React.
                </td>
                <td className="px-6 py-4 text-gray-600">Debug</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">UseState</th>
                <td className="px-6 py-4">
                  <a
                    href="/useState"
                    className="text-red-600 hover:text-red-800 transition-colors duration-200"
                  >
                    Ir a useState
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-700">Maneja el estado dentro de un componente funcional.</td>
                <td className="px-6 py-4 text-gray-600">Estado</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">UseReducer</th>
                <td className="px-6 py-4">
                  <a href="/useReducer" className="text-red-600 hover:text-red-800 transition-colors duration-200">
                    Ir a useReducer
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-700">Permite agregar un reducer a tu componente.</td>
                <td className="px-6 py-4 text-gray-600">Estado</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">UseNavigate</th>
                <td className="px-6 py-4">
                  <a
                    href="/useNavigate"
                    className="text-red-600 opacity-75 hover:text-red-800 hover:opacity-100 transition-all duration-200"
                  >
                    Ir a UseNavigate
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-700">Permite navegar entre rutas en React Router.</td>
                <td className="px-6 py-4 text-gray-600">Navegación</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">UseRef</th>
                <td className="px-6 py-4">
                  <a href="/useRef" className="text-red-600 hover:text-red-800 transition-colors duration-200">
                    Ir a UseRef
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  Permite referenciar un valor que no es necesario para el
                  renderizado.
                </td>
                <td className="px-6 py-4 text-gray-600">Referencias</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">UseImperativeHandle</th>
                <td className="px-6 py-4">
                  <a href="/useImperativeHandle" className="text-red-600 hover:text-red-800 transition-colors duration-200">
                    Ir a UseImperativeHandle
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  Permite personalizar el identificador expuesto como una ref.
                </td>
                <td className="px-6 py-4 text-gray-600">Referencias</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">UseMemo</th>
                <td className="px-6 py-4">
                  <a
                    href="/useMemo"
                    className="text-red-600 opacity-75 hover:text-red-800 hover:opacity-100 transition-all duration-200"
                  >
                    Ir a UseMemo
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  permite guardar en caché el resultado de un cálculo entre
                  renderizados.
                </td>
                <td className="px-6 py-4 text-gray-600">Performance</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">UseCallback</th>
                <td className="px-6 py-4">
                  <a
                    href="/useCallback"
                    className="text-red-600 opacity-75 hover:text-red-800 hover:opacity-100 transition-all duration-200"
                  >
                    Ir a UseCallback
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  Permite almacenar la definición de una función entre
                  renderizados subsecuentes.
                </td>
                <td className="px-6 py-4 text-gray-600">Performance</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">UseTransition</th>
                <td className="px-6 py-4">
                  <a
                    href="/useTransition"
                    className="text-red-600 opacity-75 hover:text-red-800 hover:opacity-100 transition-all duration-200"
                  >
                    Ir a UseTransition
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  Permite renderizar una parte de la interfaz de usuario en
                  segundo plano.
                </td>
                <td className="px-6 py-4 text-gray-600">Performance</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">UseInsertationEffect</th>
                <td className="px-6 py-4">
                  <a
                    href="/useId"
                    className="text-red-600 opacity-75 hover:text-red-800 hover:opacity-100 transition-all duration-200"
                  >
                    Ir a UseId
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  Mostrar contenido desactualizado mientras se carga el contenido
                  actualizado.
                </td>
                <td className="px-6 py-4 text-gray-600">Performance</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">UseEffect</th>
                <td className="px-6 py-4">
                  <a href="/useEffect" className="text-red-600 hover:text-red-800 transition-colors duration-200">
                    Ir a UseEffect
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-700">Permite sincronizar un componente con un sistema externo.</td>
                <td className="px-6 py-4 text-gray-600">Efectos/Ciclo de Vida</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">UseLayoutEffect</th>
                <td className="px-6 py-4">
                  <a href="/useLayoutEffect" className="text-red-600 hover:text-red-800 transition-colors duration-200">
                    Ir a UseLayoutEffect
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  Medir el layout antes que el navegador vuelva a pintar la
                  pantalla.
                </td>
                <td className="px-6 py-4 text-gray-600">Efectos/Ciclo de Vida</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">UseInsersationEffect</th>
                <td className="px-6 py-4">
                  <a href="/useInsersationEffect" className="text-red-600 hover:text-red-800 transition-colors duration-200">
                    Ir a UseInsersationEffect
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  Permite insertar elementos en el DOM antes de que se dispare
                  cualquier Efecto de diseño (layout).
                </td>
                <td className="px-6 py-4 text-gray-600">Efectos/Ciclo de Vida</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">UseContext</th>
                <td className="px-6 py-4">
                  <a href="/useContext" className="text-red-600 opacity-75 hover:text-red-800 hover:opacity-100 transition-all duration-200">
                    Ir a UseContext
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  Permite leer y suscribirse a un contexto desde un componente.
                </td>
                <td className="px-6 py-4 text-gray-600">Contexto y datos externos</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">UseSyncExternalStore</th>
                <td className="px-6 py-4">
                  <a
                    href="/useSyncExternalStore"
                    className="text-red-600 opacity-75 hover:text-red-800 hover:opacity-100 transition-all duration-200"
                  >
                    Ir a UseSyncExternalStore
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  Permite suscribirte a una fuente de almacenamiento de datos
                  (store) externa.
                </td>
                <td className="px-6 py-4 text-gray-600">Contexto y datos externos</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">UseId</th>
                <td className="px-6 py-4">
                  <a
                    href=""
                    className="text-red-600 opacity-75 hover:text-red-800 hover:opacity-100 transition-all duration-200"
                  >
                    Ir a UseId
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  Generar IDs únicos que se pueden pasar a los atributos de
                  accesibilidad.
                </td>
                <td className="px-6 py-4 text-gray-600">Contexto y datos externos</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">Use</th>
                <td className="px-6 py-4">
                  <a href="/use" className="text-red-600 hover:text-red-800 transition-colors duration-200">
                    Ir a Use
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  Es una API de React que te permite leer el valor de un recurso
                  como una Promesa o contexto.
                </td>
                <td className="px-6 py-4 text-gray-600">Nuevos</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">UseOptimistic</th>
                <td className="px-6 py-4">
                  <a href="/useOptimistic" className="text-red-600 hover:text-red-800 transition-colors duration-200">
                    Ir a UseOptimistic
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  Permite actualizar la interfaz de usuario / UI de manera
                  optimista.
                </td>
                <td className="px-6 py-4 text-gray-600">Nuevos</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">UseFormStatus</th>
                <td className="px-6 py-4">
                  <a href="/useFormStatus" className="text-red-600 hover:text-red-800 transition-colors duration-200">
                    Ir a UseFormStatus
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  Brinda información de estado del último formulario enviado.
                </td>
                <td className="px-6 py-4 text-gray-600">Nuevos</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">UseActionState</th>
                <td className="px-6 py-4">
                  <a href="/useActionState" className="text-red-600 hover:text-red-800 transition-colors duration-200">
                    Ir a UseActionState
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  Permite actualizar el estado en función del resultado de una
                  acción de formulario.
                </td>
                <td className="px-6 py-4 text-gray-600">Nuevos</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Categorías y Hooks oficiales (React 19):</h3>

          <ul className="text-left max-w-4xl mx-auto space-y-2">
            <li className="flex items-start">
              <strong className="text-gray-800 mr-2">Debug:</strong>
              <span className="text-gray-600">useDebugValue</span>
            </li>
            <li className="flex items-start">
              <strong className="text-gray-800 mr-2">Estado:</strong>
              <span className="text-gray-600">useState, useReducer</span>
            </li>
            <li className="flex items-start">
              <strong className="text-gray-800 mr-2">Referencias:</strong>
              <span className="text-gray-600">useRef, useImperativeHandle</span>
            </li>
            <li className="flex items-start">
              <strong className="text-gray-800 mr-2">Performance:</strong>
              <span className="text-gray-600">useMemo, useCallback, useTransition, useDeferredValue</span>
            </li>
            <li className="flex items-start">
              <strong className="text-gray-800 mr-2">Efectos / ciclo de vida:</strong>
              <span className="text-gray-600">useEffect, useLayoutEffect, useInsertionEffect</span>
            </li>
            <li className="flex items-start">
              <strong className="text-gray-800 mr-2">Contexto y datos externos:</strong>
              <span className="text-gray-600">useContext, useSyncExternalStore, useId</span>
            </li>
            <li className="flex items-start">
              <strong className="text-gray-800 mr-2">Nuevos en React 19:</strong>
              <span className="text-gray-600">use, useOptimistic, useFormStatus, useActionState</span>
            </li>
          </ul>

          <p className="mt-6 text-gray-600 italic max-w-4xl mx-auto">
            En React 19 existen ahora ~19 hooks oficiales. Además, puedes
            crear <strong className="text-gray-800">Custom Hooks</strong> combinando los existentes para
            encapsular lógica reutilizable.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeHooks;