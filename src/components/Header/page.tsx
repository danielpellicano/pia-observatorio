'use client'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Header() {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <header className="w-full border-gray-200 bg-gray-100 border-b">
      <div className="bar-top bg-[#154388] p-2">
          <ul className="flex justify-center items-center just">
            <li> <a href="https://www.iel-ce.org.br/">
            <Image src="https://www.observatorio.ind.br/wp-content/themes/fiec/images/logo/IEL.svg" alt="IEL" width={37} height={13} />
            </a></li>
            <li> <a href="http://www.sesi-ce.org.br/">
            <Image src="https://www.observatorio.ind.br/wp-content/themes/fiec/images/logo/SESI.svg" alt="SESI" width={54} height={13} />
              </a></li>
            <li> <a href="https://www.senai-ce.org.br/">
            
            <Image src="https://www.observatorio.ind.br/wp-content/themes/fiec/images/logo/SENAI.svg" alt="SESI" width={69} height={13} />
            
            
            </a></li>
            <li><a href="http://www.sfiec.org.br/">

            <Image src="https://www.observatorio.ind.br/wp-content/themes/fiec/images/logo/FIEC.svg" alt="FIEC" width={54} height={13} />
                        
            </a></li>
          </ul>

      </div>
         <div className="container mx-auto flex items-center justify-between px-6 py-4">
      <div className="text-xl font-bold text-gray-800">
        <Image src="/logo.svg" width="180" height="50" alt="Observatório da Indústria" title="Observatório da Indústria" />
      </div>
      <div className="flex items-center gap-4">
      <div className="img-profile">
        <Image
          src="/profile.png"
          alt="Foto do usuário"
          className="w-10 h-10 rounded-full object-cover"
          width={40}
          height={40}
        />
      </div>
        <div className="text-sm text-gray-700 text-right">
          <div>{session.user?.name}</div>
          <div className="text-xs text-gray-500">{session.user?.email}</div>
        </div>
      
        <button
          onClick={() => signOut({ callbackUrl: '/auth/login' })}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded cursor-pointer"
        >
          Sair
        </button>
        </div>
      </div>
    </header>



  )
}
