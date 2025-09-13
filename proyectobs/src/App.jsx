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
    </Routes>
   
   </BrowserRouter>
  )
}

export default App
