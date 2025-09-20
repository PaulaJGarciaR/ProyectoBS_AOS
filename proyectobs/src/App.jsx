import './App.css'
import HookUseState from './playground/HookUseState'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeHooks from './playground/HomeHooks'
import HookUseNavigate from './playground/HookUseNavigate'
import HookUseDebugValue from './playground/HookUseDebugValue'
import HookUseReducer from './playground/HookUseReducer'
import HookUseRef from './playground/HookUseRef'
import HookUseImperativeHandle from './playground/HookImperativeHandle'
import HookUseMemo from './playground/HookUseMemo'
import HookUseCallback from './playground/HookUseCallback'
import HookUseTransition from './playground/HookUseTransition'
import HookUseId from './playground/HookUseId'
import HookUseEffect from './playground/HookUseId'
import HookUseLayoutEffect from './playground/HookUseLayoutEffect'
import HookUseInsersationEffect from './playground/HookUseInsersationEffect'
import HookUseContext from './playground/HookUseContext'
import HookUseSyncExternalStore from './playground/HookUseSyncExternalStore'
import HookUse from './playground/HookUse'
import HookUseOptimistic from './playground/HookUseOptimistic'
import HookUseFormStatus from './playground/HookUseFormStatus'
import HookUseActionState from './playground/HookUseActionState'


function App() {

  return (
   <BrowserRouter>
    <Routes>
      {/*Rutas */}
      <Route path='/' element={<HomeHooks/>} ></Route>

      <Route path='/useState' element={<HookUseState/>} ></Route>
      <Route path='/useNavigate' element={<HookUseNavigate/>} ></Route>
      <Route path='/useDebugValue' element={<HookUseDebugValue/>} ></Route>
      <Route path='/useReducer' element={<HookUseReducer/>} ></Route>
      <Route path='/useRef' element={<HookUseRef/>} ></Route>
      <Route path='/useRef' element={<HookUseRef/>} ></Route>
      <Route path='/useImperativeHandle' element={<HookUseImperativeHandle/>} ></Route>
      <Route path='/useMemo' element={<HookUseMemo/>} ></Route>
      <Route path='/useCallback' element={<HookUseCallback/>} ></Route>
      <Route path='/useCallback' element={<HookUseCallback/>} ></Route>
      <Route path='/useTransition' element={<HookUseTransition/>} ></Route>
      <Route path='/useId' element={<HookUseId/>} ></Route>
      <Route path='/useEffect' element={<HookUseEffect/>} ></Route>
      <Route path='/useLayoutEffect' element={<HookUseLayoutEffect/>} ></Route>
      <Route path='/useInsersationEffect' element={<HookUseInsersationEffect/>} ></Route>
      <Route path='/useContext' element={<HookUseContext/>} ></Route>
      <Route path='/useSyncExternalStore' element={<HookUseSyncExternalStore/>} ></Route>
      <Route path='/use' element={<HookUse/>} ></Route>
      <Route path='/useOptimistic' element={<HookUseOptimistic/>} ></Route>
      <Route path='/useFormStatus' element={<HookUseFormStatus/>} ></Route>
      <Route path='/useActionState' element={<HookUseActionState/>} ></Route>
    </Routes>
   
   </BrowserRouter>
  )
}

export default App
