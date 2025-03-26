'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import mockUsers from '@/mock/users.json'

type User = {
  id: number
  nome: string
  email: string
  perfil: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, senha: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  function login(email: string, senha: string) {
    const foundUser = mockUsers.find(u => u.email === email && u.senha === senha)
    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem('user', JSON.stringify(foundUser))
      return true
    }
    return false
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
