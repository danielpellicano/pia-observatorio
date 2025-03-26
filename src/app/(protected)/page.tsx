'use client'

import { useEffect, useState } from 'react'
import { getPIAValues } from '@/services/sidraApi'
import Filter from '@/components/Filter'

export default function Dashboard() {
  const [dados, setDados] = useState<any[]>([])
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const carregar = async () => {
      setLoading(true)
      try {
        const res = await getPIAValues()
        setDados(Array.isArray(res) ? res : [res]) // pode vir como objeto único
      } catch (err: any) {
        setErro(err.message)
      } finally {
        setLoading(false)
      }
    }

    carregar()
  }, [])

  return (
    <>
    <div className="p-6 bg-gray-200 ">
      <h1 className="text-2xl font-bold mb-4">PIA Empresa - Dados IBGE</h1>

      {loading && <p>Carregando...</p>}
      {erro && <p className="text-red-600">{erro}</p>}


      <Filter/>


    </div>
    </>
  )
}
