'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const sucesso = login(email, senha)
    if (sucesso) {
      router.push('/dashboard')
    } else {
      setErro('Credenciais inválidas')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-xl p-8 rounded-lg w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        {erro && <p className="text-red-500">{erro}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border mt-2 rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          className="w-full p-2 border mt-2 rounded"
        />
        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </main>
  )
}
