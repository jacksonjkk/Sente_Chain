// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import LandingPage      from "./pages/LandingPage"
import AuthPage         from "./pages/Authpage"
import MemberDashboard  from "./pages/MemberDashboard"
import CashierDashboard from "./pages/CashierDashboard"
import AdminDashboard   from "./pages/AdminDashboard"
import SACCOPublicView  from "./pages/SACCOPublicView"

function RoleRoute() {
  const { auth } = useAuth()
  if (!auth) return <Navigate to="/auth" replace />
  if (auth.role === "member")  return <MemberDashboard />
  if (auth.role === "cashier") return <CashierDashboard />
  if (auth.role === "admin")   return <AdminDashboard />
  return <Navigate to="/auth" replace />
}

function RootRoute() {
  const { auth } = useAuth()
  return auth ? <Navigate to="/dashboard" replace /> : <LandingPage />
}

function AuthRoute() {
  const { auth } = useAuth()
  return auth ? <Navigate to="/dashboard" replace /> : <AuthPage />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"               element={<RootRoute />} />
          <Route path="/auth"           element={<AuthRoute />} />
          <Route path="/sacco/:saccoId" element={<SACCOPublicView />} />
          <Route path="/dashboard"      element={<RoleRoute />} />
          <Route path="*"               element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}