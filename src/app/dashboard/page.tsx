'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user])

  if (!user) return null

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bem-vindo, {user.nome}</h1>
      <p className="mt-2">Perfil: {user.perfil}</p>
      <button
        onClick={() => {
          logout()
          router.push('/login')
        }}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Sair
      </button>
    </div>
  )
}
