'use client'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Header() {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <header className="w-full flex items-center justify-between bg-gray-100 px-6 py-4 border-b border-gray-200">
      <div className="text-xl font-bold text-gray-800">
        <Image src="/logo.png" width="180" height="50" alt="Observatório da Indústria" title="        Observatório da Indústria" />
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-700 text-right">
          <div>{session.user?.name}</div>
          <div className="text-xs text-gray-500">{session.user?.email}</div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded"
        >
          Sair
        </button>
      </div>
    </header>
  )
}
