'use client'

import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [nome, setNome] = useState('')
  const [erro, setErro] = useState('')
  const [modoCadastro, setModoCadastro] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/')
    }
  }, [status, router])

  if (status === 'loading') return null

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password: senha,
      callbackUrl: '/',
    })

    if (result?.error) {
      setErro('Login inválido')
    } else if (result?.ok && result.url) {
      router.push(result.url)
    }
  }

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem')
      return
    }

    try {
      const response = await fetch('/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      })

      const data = await response.json()

      if (!response.ok) {
        setErro(data?.message || 'Erro ao cadastrar usuário')
        return
      }

      // Login automático após cadastro
      const login = await signIn('credentials', {
        redirect: false,
        email,
        password: senha,
        callbackUrl: '/dashboard',
      })

      if (login?.ok && login.url) {
        router.push(login.url)
      } else {
        setErro('Erro ao logar após cadastro')
      }

    } catch (err) {
      setErro('Erro no cadastro')
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 bg-gray-200">
       <Image src="/logo.svg" width="280" height="80" alt="Observatório da Indústria" title="Observatório da Indústria" />
      <div className="bg-white w-full max-w-sm rounded-lg shadow-lg">
      <div className="flex gap-0 mb-6">
        <button
          className={`w-1/2 py-2 px-4 text-lg font-semibold transition duration-300 cursor-pointer ${
            !modoCadastro
              ? 'bg-white text-black rounded-t-2xl'
              : 'bg-[#E5E7EB] text-gray-600 rounded-none'
          }`}
          onClick={() => setModoCadastro(false)}
        >
          Login
        </button>
        <button
          className={`w-1/2 py-2 px-4 text-lg font-semibold transition duration-300 cursor-pointer rounded-none bg-[#E5E7EB] ${
            modoCadastro
              ? 'bg-white text-black  rounded-tr-[8px] '
              : 'bg-[#E5E7EB] text-gray-600 rounded-none'
          }`}
          onClick={() => setModoCadastro(true)}
        >
          Cadastro
        </button>
      </div>

        {modoCadastro ? (
          <form onSubmit={handleCadastro} className="flex flex-col gap-4 p-6">
            <input
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Nome"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              required
            />
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              required
            />
            <input
              value={senha}
              onChange={e => setSenha(e.target.value)}
              type="password"
              placeholder="Senha"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              required
            />
            <input
              value={confirmarSenha}
              onChange={e => setConfirmarSenha(e.target.value)}
              type="password"
              placeholder="Confirmar Senha"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              required
            />
            <button
              type="submit"
              className="p-2 bg-[#154388] text-white rounded-md hover:bg-green-600 transition duration-300"
            >
              Cadastrar
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="flex flex-col gap-4 p-6">
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              required
            />
            <input
              value={senha}
              onChange={e => setSenha(e.target.value)}
              type="password"
              placeholder="Senha"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              required
            />
            <button
              type="submit"
              className="p-2 bg-[#154388] text-white rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer"
            >
              Entrar
            </button>
          </form>
        )}

        {erro && <p className="text-red-500 text-sm text-center mt-2">{erro}</p>}

        {!modoCadastro && (
          <>
            <div className="text-center text-sm text-gray-500 my-4">ou</div>

            <div className="flex flex-col gap-2 px-6 pb-6">
              <button
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                className="p-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition duration-300 flex justify-center gap-3 items-center"
              >
                <Image src="/google.png" alt="Google" width={30} height={30} />Entrar com Google
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
