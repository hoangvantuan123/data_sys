import { useEffect, useState, useMemo, lazy, Suspense, useCallback, useRef } from 'react'
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate
} from 'react-router-dom'
import { Layout, message, notification } from 'antd'
const HomePage = lazy(() => import('../page/home/index'))
const PayrollSync = lazy(() => import('../page/payroll/payrollSync'))





const UserRouter = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [errorMenu, setErrorMenu] = useState(false)







  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/u/sys/payroll" element={<PayrollSync />} />
    </Routes>
  )
}

const App = () => (
  <Router>
    <UserRouter />
  </Router>
)

export default App
