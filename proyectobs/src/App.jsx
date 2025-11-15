import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute, RoleProtectedRoute, PublicRoute } from './components/ProtectedRoute'

/* Páginas principales */
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ForgotPassword from './pages/ForgotPassword'
import ChangePassword from './pages/ChangePasswordPage'
import SessionsTable from './components/SessionsTable'

/* CRUD */
import Users from './components/UsersPage'
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
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path='/' element={<HomePage />} />
          
          {/* Rutas de autenticación - redirigen al dashboard si ya está autenticado */}
          <Route 
            path='/login' 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          <Route 
            path='/register' 
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            } 
          />
          <Route 
            path='/forgotpassword' 
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            } 
          />

          <Route 
            path='/changepassword' 
            element={
                <ChangePassword />
            } 
          />

          <Route 
            path='/dashboard/*' 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          >
            <Route 
              path='users' 
              element={
                <RoleProtectedRoute allowedRoles={['admin', 'superadmin']}>
                  <Users />
                </RoleProtectedRoute>
              } 
            />
            <Route 
              path='staff' 
              element={
                <RoleProtectedRoute allowedRoles={['admin', 'superadmin']}>
                  <Staff />
                </RoleProtectedRoute>
              } 
            />
          </Route>

          <Route 
            path='/sessions' 
            element={
              <RoleProtectedRoute allowedRoles={['admin', 'superadmin']}>
                <SessionsTable />
              </RoleProtectedRoute>
            }
          />

          <Route 
            path='/hooks' 
            element={
              <ProtectedRoute>
                <HomeHooks />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/useState' 
            element={
              <ProtectedRoute>
                <HookUseState />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/useNavigate' 
            element={
              <ProtectedRoute>
                <HookUseNavigate />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/useDebugValue' 
            element={
              <ProtectedRoute>
                <HookUseDebugValue />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/useReducer' 
            element={
              <ProtectedRoute>
                <HookUseReducer />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/useRef' 
            element={
              <ProtectedRoute>
                <HookUseRef />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/ImperativeHandle' 
            element={
              <ProtectedRoute>
                <HookImperativeHandle />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/useMemo' 
            element={
              <ProtectedRoute>
                <HookUseMemo />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/useCallback' 
            element={
              <ProtectedRoute>
                <HookUseCallback />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/useTransition' 
            element={
              <ProtectedRoute>
                <HookUseTransition />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/useId' 
            element={
              <ProtectedRoute>
                <HookUseId />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/useEffect' 
            element={
              <ProtectedRoute>
                <HookUseEffect />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/useLayoutEffect' 
            element={
              <ProtectedRoute>
                <HookUseLayoutEffect />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/useInsersationEffect' 
            element={
              <ProtectedRoute>
                <HookUseInsersationEffect />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/useContext' 
            element={
              <ProtectedRoute>
                <HookUseContext />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/useSyncExternalStore' 
            element={
              <ProtectedRoute>
                <HookUseSyncExternalStore />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/use' 
            element={
              <ProtectedRoute>
                <HookUse />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/useOptimistic' 
            element={
              <ProtectedRoute>
                <HookUseOptimistic />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/useFormStatus' 
            element={
              <ProtectedRoute>
                <HookUseFormStatus />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/useActionState' 
            element={
              <ProtectedRoute>
                <HookUseActionState />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App