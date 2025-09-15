import React from "react";
function HomeHooks() {
  return (
    <div className="container justify-content-center">
      <div className="text-center">
        <h2>Ejemplos de Hooks</h2>
        <table class="table text-start">
          <thead className="table-dark">
            <tr>
              <th scope="col">Hook</th>
              <th scope="col">Ruta</th>
              <th scope="col">Descripción</th>
              <th scope="col">Categoría</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">UseDebugValue</th>
              <td>
                <a
                  href="/useDebugValue"
                  className="list-group-item text-danger opacity-75 link-danger"
                >
                  Ir a UseDebugValue
                </a>
              </td>
              <td>
                Permite añadir una etiqueta a un Hook personalizado en las
                herramientas de desarrollo de React.
              </td>
              <td>Debug</td>
            </tr>
            <tr>
              <th scope="row">UseState</th>
              <td>
                <a
                  href="/useState"
                  className="list-group-item text-danger link-danger"
                >
                  Ir a useState
                </a>
              </td>
              <td>Maneja el estado dentro de un componente funcional.</td>
              <td>Estado</td>
            </tr>
            <tr>
              <th scope="row">UseReducer</th>
              <td>
                <a href="/useReducer" className="list-group-item text-danger link-danger">
                  Ir a useReducer
                </a>
              </td>
              <td>Permite agregar un reducer a tu componente.</td>
              <td>Estado</td>
            </tr>
            <tr>
              <th scope="row">UseNavigate</th>
              <td>
                <a
                  href="/useNavigate"
                  className="list-group-item text-danger link-danger opacity-75"
                >
                  Ir a UseNavigate
                </a>
              </td>
              <td>Permite navegar entre rutas en React Router.</td>
              <td>Navegación</td>
            </tr>
            <tr>
              <th scope="row">UseRef</th>
              <td>
                <a href="/useRef" className="list-group-item text-danger link-danger">
                  Ir a UseRef
                </a>
              </td>
              <td>
                Permite referenciar un valor que no es necesario para el
                renderizado.
              </td>
              <td>Referencias</td>
            </tr>
            <tr>
              <th scope="row">UseImperativeHandle</th>
              <td>
                <a href="/useImperativeHandle" className="list-group-item text-danger link-danger">
                  Ir a UseImperativeHandle
                </a>
              </td>
              <td>
                Permite personalizar el identificador expuesto como una ref.
              </td>
              <td>Referencias</td>
            </tr>
            <tr>
              <th scope="row">UseMemo</th>
              <td>
                <a
                  href="/useMemo"
                  className="list-group-item text-danger link-danger opacity-75"
                >
                  Ir a UseMemo
                </a>
              </td>
              <td>
                permite guardar en caché el resultado de un cálculo entre
                renderizados.
              </td>
              <td>Performance</td>
            </tr>
            <tr>
              <th scope="row">UseCallback</th>
              <td>
                <a
                  href="/useCallback"
                  className="list-group-item text-danger link-danger opacity-75"
                >
                  Ir a UseCallback
                </a>
              </td>
              <td>
                Permite almacenar la definición de una función entre
                renderizados subsecuentes.
              </td>
              <td>Performance</td>
            </tr>
            <tr>
              <th scope="row">UseTransition</th>
              <td>
                <a
                  href="/useTransition"
                  className="list-group-item text-danger link-danger opacity-75"
                >
                  Ir a UseTransition
                </a>
              </td>
              <td>
                Permite renderizar una parte de la interfaz de usuario en
                segundo plano.
              </td>
              <td>Performance</td>
            </tr>
            <tr>
              <th scope="row">UseInsertationEffect</th>
              <td>
                <a
                  href="/useId"
                  className="list-group-item text-danger link-danger opacity-75"
                >
                  Ir a UseId
                </a>
              </td>
              <td>
                Mostrar contenido desactualizado mientras se carga el contenido
                actualizado.
              </td>
              <td>Performance</td>
            </tr>
            <tr>
              <th scope="row">UseEffect</th>
              <td>
                <a href="/useEffect" className="list-group-item text-danger link-danger">
                  Ir a UseEffect
                </a>
              </td>
              <td>Permite sincronizar un componente con un sistema externo.</td>
              <td>Efectos/Ciclo de Vida</td>
            </tr>
            <tr>
              <th scope="row">UseLayoutEffect</th>
              <td>
                <a href="/useLayoutEffect" className="list-group-item text-danger link-danger">
                  Ir a UseLayoutEffect
                </a>
              </td>
              <td>
                Medir el layout antes que el navegador vuelva a pintar la
                pantalla.
              </td>
              <td>Efectos/Ciclo de Vida</td>
            </tr>
            <tr>
              <th scope="row">UseInsersationEffect</th>
              <td>
                <a href="/useInsersationEffect" className="list-group-item text-danger link-danger">
                  Ir a UseInsersationEffect{" "}
                </a>
              </td>
              <td>
                Permite insertar elementos en el DOM antes de que se dispare
                cualquier Efecto de diseño (layout).
              </td>
              <td>Efectos/Ciclo de Vida</td>
            </tr>
            <tr>
              <th scope="row">UseContext</th>
              <td>
                <a href="/useContext" className="list-group-item text-danger link-danger opacity-75">
                  Ir a UseContext
                </a>
              </td>
              <td>
                Permite leer y suscribirse a un contexto desde un componente.
              </td>
              <td>Contexto y datos externos</td>
            </tr>
            <tr>
              <th scope="row">UseSyncExternalStore</th>
              <td>
                <a
                  href="/useSyncExternalStore"
                  className="list-group-item text-danger link-danger opacity-75"
                >
                  Ir a UseSyncExternalStore
                </a>
              </td>
              <td>
                Permite suscribirte a una fuente de almacenamiento de datos
                (store) externa.
              </td>
              <td>Contexto y datos externos</td>
            </tr>
            <tr>
              <th scope="row">UseId</th>
              <td>
                <a
                  href=""
                  className="list-group-item text-danger link-danger opacity-75"
                >
                  Ir a UseId{" "}
                </a>
              </td>
              <td>
                Generar IDs únicos que se pueden pasar a los atributos de
                accesibilidad.
              </td>
              <td>Contexto y datos externos</td>
            </tr>
            <tr>
              <th scope="row">Use</th>
              <td>
                <a href="/use" className="list-group-item text-danger link-danger">
                  Ir a Use
                </a>
              </td>
              <td>
                Es una API de React que te permite leer el valor de un recurso
                como una Promesa o contexto.
              </td>
              <td>Nuevos</td>
            </tr>
            <tr>
              <th scope="row">UseOptimistic</th>
              <td>
                <a href="/useOptimistic" className="list-group-item text-danger link-danger">
                  Ir a UseOptimistic
                </a>
              </td>
              <td>
                Permite actualizar la interfaz de usuario / UI de manera
                optimista.
              </td>
              <td>Nuevos</td>
            </tr>
            <tr>
              <th scope="row">UseFormStatus</th>
              <td>
                <a href="/useFormStatus" className="list-group-item text-danger link-danger">
                  Ir a UseFormStatus{" "}
                </a>
              </td>
              <td>
                Brinda información de estado del último formulario enviado.
              </td>
              <td>Nuevos</td>
            </tr>
            <tr>
              <th scope="row">UseActionState</th>
              <td>
                <a href="/useActionState" className="list-group-item text-danger link-danger">
                  Ir a UseActionState
                </a>
              </td>
              <td>
                Permite actualizar el estado en función del resultado de una
                acción de formulario.
              </td>
              <td>Nuevos</td>
            </tr>
          </tbody>
        </table>
        <div>
          <h3>Categorías y Hooks oficiales (React 19):</h3>

          <ul className="text-start">
            <li>
              <strong>Debug:</strong> useDebugValue
            </li>
            <li>
              <strong>Estado:</strong> useState, useReducer
            </li>
            <li>
              <strong>Referencias:</strong> useRef, useImperativeHandle
            </li>
            <li>
              <strong>Performance:</strong> useMemo, useCallback, useTransition,
              useDeferredValue
            </li>
            <li>
              <strong>Efectos / ciclo de vida:</strong> useEffect,
              useLayoutEffect, useInsertionEffect
            </li>
            <li>
              <strong>Contexto y datos externos:</strong> useContext,
              useSyncExternalStore, useId
            </li>
            <li>
              <strong>Nuevos en React 19:</strong> use, useOptimistic,
              useFormStatus, useActionState
            </li>
          </ul>

          <p>
            <em>
              En React 19 existen ahora ~19 hooks oficiales. Además, puedes
              crear <strong>Custom Hooks</strong> combinando los existentes para
              encapsular lógica reutilizable.
            </em>
          </p>
        </div>
      </div>
    </div>
  );
}
export default HomeHooks;
