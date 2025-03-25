'use client'

import Header from '@/components/Header/page'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const queryClient = new QueryClient()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login')
    }
  }, [status, router])

  if (status === 'loading') return null
  if (!session) return null

  return <>
   <Header />
   <QueryClientProvider client={queryClient}>
  {children}
  </QueryClientProvider>
  </>
}
