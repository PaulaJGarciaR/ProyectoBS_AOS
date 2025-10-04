import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

/* Páginas principales */
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ForgotPassword from './pages/ForgotPassword'
import ChangePassword from './pages/ChangePasswordPage'

/* CRUD */
import Users from './components/UsersPage'
import Products from './components/ProductsPage'
import Staff from './components/StaffPage'

/* Playground hooks */
import HomeHooks from './playground/HomeHooks'
import HookUseState from './playground/HookUseState'
import HookUseNavigate from './playground/HookUseNavigate'
import HookUseDebugValue from './playground/HookUseDebugValue'
import HookUseReducer from './playground/HookUseReducer'
import HookUseRef from './playground/HookUseRef'
import HookImperativeHandle from './playground/HookImperativeHandle'
import HookUseMemo from './playground/HookUseMemo'
import HookUseCallback from './playground/HookUseCallback'
import HookUseTransition from './playground/HookUseTransition'
import HookUseId from './playground/HookUseId'
import HookUseEffect from './playground/HookUseEffect'
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
        {/* Rutas públicas */}
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/changepassword' element={<ChangePassword />} />

        {/* Dashboard con rutas hijas */}
        <Route path='/dashboard/*' element={<DashboardPage />}>
          <Route path='users' element={<Users />} />
          <Route path='products' element={<Products />} />
          <Route path='staff' element={<Staff />} />
        </Route>

        {/* Playground de hooks */}
        <Route path='/hooks' element={<HomeHooks />} />
        <Route path='/useState' element={<HookUseState />} />
        <Route path='/useNavigate' element={<HookUseNavigate />} />
        <Route path='/useDebugValue' element={<HookUseDebugValue />} />
        <Route path='/useReducer' element={<HookUseReducer />} />
        <Route path='/useRef' element={<HookUseRef />} />
        <Route path='/ImperativeHandle' element={<HookImperativeHandle />} />
        <Route path='/useMemo' element={<HookUseMemo />} />
        <Route path='/useCallback' element={<HookUseCallback />} />
        <Route path='/useTransition' element={<HookUseTransition />} />
        <Route path='/useId' element={<HookUseId />} />
        <Route path='/useEffect' element={<HookUseEffect />} />
        <Route path='/useLayoutEffect' element={<HookUseLayoutEffect />} />
        <Route path='/useInsersationEffect' element={<HookUseInsersationEffect />} />
        <Route path='/useContext' element={<HookUseContext />} />
        <Route path='/useSyncExternalStore' element={<HookUseSyncExternalStore />} />
        <Route path='/use' element={<HookUse />} />
        <Route path='/useOptimistic' element={<HookUseOptimistic />} />
        <Route path='/useFormStatus' element={<HookUseFormStatus />} />
        <Route path='/useActionState' element={<HookUseActionState />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
