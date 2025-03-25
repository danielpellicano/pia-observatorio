'use client'

import { useEffect, useState } from 'react'
import { getPIAValues } from '@/services/sidraApi'
import FiltroVariaveisCheckbox from '@/components/Filtro/VariaveisCheckBox'
import FiltroGeral from '@/components/FiltroGeral'

export default function Dashboard() {
  const [dados, setDados] = useState<any[]>([])
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const [variaveisSelecionadas, setVariaveisSelecionadas] = useState<string[]>([])


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
    <div className="p-6 bg-gray-200">
      <h1 className="text-2xl font-bold mb-4">PIA Empresa - Dados IBGE</h1>

      {loading && <p>Carregando...</p>}
      {erro && <p className="text-red-600">{erro}</p>}
{/* 
      {!loading && !erro && (
        <div className="overflow-auto text-sm bg-gray-100 p-4 rounded max-h-[400px]">
          <pre>{JSON.stringify(dados, null, 2)}</pre>
        </div>
      )} */}

{/* 
      <FiltroVariaveisCheckbox onChange={(selecionadas) => {
        setVariaveisSelecionadas(selecionadas)
        console.log('Selecionadas:', selecionadas)
      }} />
   */}

      <FiltroGeral onChange={(filtros) => {
        console.log(filtros)
        // {
        //   variaveis: ['1000630'],
        //   cnaes: ['117897'],
        //   anos: ['2022']
        // }
      }} />


    </div>
  )
}
