# Qué es un Hook

Un Hook es una función de javascript que permite crear/acceder al estado y a los ciclos de vida de React y que, para asegurar la estabilidad de la aplicación, debe de utilizarse siguiendo dos reglas básicas:

• Debe de ser llamado en el nivel superior de la aplicación - Un hook nunca debe de llamarse dentro de ciclos, condicionales o funciones anidadas, ya que el orden de llamada de los hooks debe de ser siempre el mismo para asegurar que el resultado sea predecible durante la renderización. Este uso únicamente en el nivel superior es lo que asegura que el estado interno de React se preserve correctamente entre diferentes llamadas del mismo hook.

• Debe de llamarse en funciones o en otros hooks personalizados de React - Un hook nunca debe de ser llamado fuera de una función de React o de otro hook personalizado, de forma que la lógica de estado del componente sea cláramente visible desde el resto del código para el scope establecido por React.

# Categorías y Hooks oficiales (React 19)
Debug: useDebugValue
Estado: useState, useReducer
Referencias: useRef, useImperativeHandle
Performance: useMemo, useCallback, useTransition, useDeferredValue
Efectos / ciclo de vida: useEffect, useLayoutEffect, useInsertionEffect
Contexto y datos externos: useContext, useSyncExternalStore, useId
Nuevos en React 19: use, useOptimistic, useFormStatus, useActionState
En React 19 existen ahora ~19 hooks oficiales. Además, puedes crear Custom Hooks combinando los existentes para encapsular lógica reutilizable.

