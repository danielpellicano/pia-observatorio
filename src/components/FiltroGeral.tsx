'use client'

import { useState } from 'react'
import filtrosMock from '@/mock/mockFiltros.json'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Loader from '@/components/Loader'
import { useRef } from 'react'

export default function FiltroGeral() {
  const [variaveisSelecionadas, setVariaveisSelecionadas] = useState<string[]>([])
  const [cnaesSelecionadas, setCnaesSelecionadas] = useState<string[]>([])
  const [anosSelecionados, setAnosSelecionados] = useState<string[]>([])
  const [url, setUrl] = useState<string>('')
  const [dados, setDados] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const montarURL = () => {
    if (variaveisSelecionadas.length && cnaesSelecionadas.length && anosSelecionados.length) {
      const base = 'https://apisidra.ibge.gov.br/values/t/1842/n1/all'
      const v = `v/${variaveisSelecionadas.join(',')}`
      const p = `p/${anosSelecionados.join(',')}`
      const c = `c12762/${cnaesSelecionadas.join(',')}`
      return `${base}/${v}/${p}/${c}`
    }
    return ''
  }

  const resultadoRef = useRef<HTMLDivElement>(null)


  const handleToggle = (
    codigo: string,
    selecionados: string[],
    setSelecionados: (value: string[]) => void
  ) => {
    const atualizados = selecionados.includes(codigo)
      ? selecionados.filter(c => c !== codigo)
      : [...selecionados, codigo]
    setSelecionados(atualizados)
  }

  const buscarDados = async () => {
    const apiUrl = montarURL()
    if (!apiUrl) return

    try {
      setLoading(true)
      setUrl(apiUrl)

      const response = await fetch(apiUrl)
      const json = await response.json()
      const dadosFiltrados = json.slice(1) // remove cabeçalho
      setDados(dadosFiltrados)
      setTimeout(() => {
        resultadoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 10) // timeout pequeno só pra garantir que o DOM atualizou
    } catch (err) {
      console.error('Erro ao buscar dados:', err)
    } finally {
      setLoading(false)
     
    }
  }

  const renderAcordeon = () => {
    if (!dados.length) return null

    const agrupado: Record<string, Record<string, Record<string, Record<string, string>>>> = {}

    dados.forEach(item => {
      const local = item.D1N // Ex: Brasil
      const variavel = item.D2N
      const ano = item.D3N
      const cnae = item.D4N
      const valor = item.V

      if (!agrupado[local]) agrupado[local] = {}
      if (!agrupado[local][variavel]) agrupado[local][variavel] = {}
      if (!agrupado[local][variavel][ano]) agrupado[local][variavel][ano] = {}

      agrupado[local][variavel][ano][cnae] = valor
    })

    return (
      <>
      <div className="container-tabelas mt-4">
        {Object.entries(agrupado).map(([local, variaveis], i) => (
          <details key={i} open className="mb-6 border rounded">
            <summary className="cursor-pointer p-3 font-semibold bg-gray-100">{local}</summary>
            <div className="pl-4 pr-4 pb-4">
              {Object.entries(variaveis).map(([variavel, anos], j) => (
                <details key={j} className="mb-4">
                  <summary className="cursor-pointer p-2 font-medium bg-gray-50 border rounded">
                    {variavel}
                  </summary>
                  <div className="pl-4 pt-2">
                    {Object.entries(anos).map(([ano, cnaes], k) => (
                      <details key={k} className="mb-2">
                        <summary className="cursor-pointer text-sm font-semibold bg-gray-100 px-2 py-1 rounded">
                          Ano: {ano}
                        </summary>
                        <ul className="list-disc list-inside text-sm text-gray-700 mt-2 ml-4">
                          {Object.entries(cnaes).map(([cnae, valor], idx) => (
                            <li key={idx}>
                              <span className="font-medium">{cnae}:</span> {valor}
                            </li>
                          ))}
                        </ul>
                        {/* Gráfico */}
                        <div className="h-64 mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={Object.entries(cnaes).map(([cnae, valor]) => ({
                                cnae,
                                valor: parseFloat(valor.replace(',', '.')) || 0
                              }))}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="cnae" tick={{ fontSize: 10 }} />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="valor" fill="#3b82f6" name={variavel} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </details>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </details>
        ))}
      </div>
      </>
    )
  }

  return (
    <div className="p-4 border rounded bg-white grid gap-6 md:grid-cols-3">
      {/* Variáveis */}
      <div>
        <h3 className="text-base font-semibold mb-2">Variáveis</h3>
        <div className="flex flex-col gap-1 max-h-60 overflow-auto">
          <label className="flex gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={filtrosMock.variaveis.every(v => variaveisSelecionadas.includes(v.codigo))}
              onChange={() => {
                if (filtrosMock.variaveis.every(v => variaveisSelecionadas.includes(v.codigo))) {
                  setVariaveisSelecionadas([])
                } else {
                  setVariaveisSelecionadas(filtrosMock.variaveis.map(v => v.codigo))
                }
              }}
            />
            Selecionar todos
          </label>

          {filtrosMock.variaveis.map(v => (
            <label key={v.codigo} className="flex gap-2 text-sm">
              <input
                type="checkbox"
                checked={variaveisSelecionadas.includes(v.codigo)}
                onChange={() => handleToggle(v.codigo, variaveisSelecionadas, setVariaveisSelecionadas)}
              />
              {v.nome}
            </label>
          ))}
        </div>
      </div>

     {/* CNAEs */}
      <div>
        <h3 className="text-base font-semibold mb-2">CNAEs</h3>
        <div className="flex flex-col gap-1 max-h-60 overflow-auto">
          <label className="flex gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={filtrosMock.cnaes.every(c => cnaesSelecionadas.includes(c.codigo))}
              onChange={() => {
                if (filtrosMock.cnaes.every(c => cnaesSelecionadas.includes(c.codigo))) {
                  setCnaesSelecionadas([])
                } else {
                  setCnaesSelecionadas(filtrosMock.cnaes.map(c => c.codigo))
                }
              }}
            />
            Selecionar todos
          </label>

          {filtrosMock.cnaes.map(c => (
            <label key={c.codigo} className="flex gap-2 text-sm">
              <input
                type="checkbox"
                checked={cnaesSelecionadas.includes(c.codigo)}
                onChange={() => handleToggle(c.codigo, cnaesSelecionadas, setCnaesSelecionadas)}
              />
              {c.nome}
            </label>
          ))}
        </div>
      </div>

      {/* Anos */}
      <div>
        <h3 className="text-base font-semibold mb-2">Anos</h3>
        <div className="flex flex-col gap-1 max-h-60 overflow-auto">
          <label className="flex gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={filtrosMock.anos.every(ano => anosSelecionados.includes(ano))}
              onChange={() => {
                if (filtrosMock.anos.every(ano => anosSelecionados.includes(ano))) {
                  setAnosSelecionados([])
                } else {
                  setAnosSelecionados(filtrosMock.anos)
                }
              }}
            />
            Selecionar todos
          </label>

          {filtrosMock.anos.map(ano => (
            <label key={ano} className="flex gap-2 text-sm">
              <input
                type="checkbox"
                checked={anosSelecionados.includes(ano)}
                onChange={() => handleToggle(ano, anosSelecionados, setAnosSelecionados)}
              />
              {ano}
            </label>
          ))}
        </div>
      </div>


      {/* Botão buscar */}
      <div className="md:col-span-3 mt-4">
        <button
          onClick={buscarDados}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {/* URL */}
      <div className="md:col-span-3 text-xs text-gray-500 mt-2 break-all">
        {url && <div><strong>URL:</strong> {url}</div>}
      </div>

      {/* Resultado formatado */}
      <div className="md:col-span-3" ref={resultadoRef}>
        {loading ? <Loader /> : renderAcordeon()}
      </div>
    </div>
  )
}