// src/app/layout.tsx (RootLayout)
import '../globals.css'
import { Providers } from '@/providers/providers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import Header from '@/components/Header/page'
import Footer from '@/components/Footer/page'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

 const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''
  const isLoginPage = pathname.startsWith('/auth/login')

  if (!session && !isLoginPage) {
    redirect('/auth/login')
  }

  if (session && isLoginPage) {
    redirect('/')
  }

  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        </body>
        </html>

  )
}
