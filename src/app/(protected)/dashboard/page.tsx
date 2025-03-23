'use client'

import { useSession } from 'next-auth/react'

export default function DashboardPage() {
  const { data: session } = useSession()
  return <h1>Dashboard: {session?.user?.name}</h1>
}
