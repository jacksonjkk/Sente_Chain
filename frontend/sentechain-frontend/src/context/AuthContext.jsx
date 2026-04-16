// src/context/AuthContext.jsx
import { createContext, useContext, useState, useCallback } from "react"
import { setToken, clearToken } from "../services/api"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null)

  const login = useCallback((data) => {
    // data: { token, member_id, role, name, sacco_id, balance_kes, ... }
    setToken(data.token)
    setAuth(data)
  }, [])

  const logout = useCallback(() => {
    clearToken()
    setAuth(null)
  }, [])

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }