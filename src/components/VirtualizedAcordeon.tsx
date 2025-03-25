'use client'

import {
  useRef,
  useMemo,
  useState,
  lazy,
  Suspense
} from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

const BarChartLazy = lazy(() => import('@/components/BarChartWrapper'))

type Item = {
  D1N: string // Local
  D2N: string // Variável
  D3N: string // Ano
  D4N: string // CNAE
  V: string   // Valor
}

interface Props {
  dados: Item[]
}

export default function VirtualizedAcordeon({ dados }: Props) {
  const [localAberto, setLocalAberto] = useState<string | null>(null)
  const [variavelAberta, setVariavelAberta] = useState<string | null>(null)
  const [graficoAberto, setGraficoAberto] = useState<string | null>(null)

  const agrupado = useMemo(() => {
    const obj: Record<string, Record<string, Record<string, Record<string, string>>>> = {}

    dados.forEach(item => {
      const local = item.D1N
      const variavel = item.D2N
      const ano = item.D3N
      const cnae = item.D4N
      const valor = item.V

      if (!obj[local]) obj[local] = {}
      if (!obj[local][variavel]) obj[local][variavel] = {}
      if (!obj[local][variavel][ano]) obj[local][variavel][ano] = {}

      obj[local][variavel][ano][cnae] = valor
    })

    return Object.entries(obj) // [ [local, variaveis], ... ]
  }, [dados])

  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: agrupado.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 250, // Altura média de um bloco
    overscan: 5,
  })

  return (
    <div
      ref={parentRef}
      className="relative overflow-auto h-[600px] border rounded mt-4"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const [local, variaveis] = agrupado[virtualRow.index]

          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className="mb-4"
            >
              <details
                open={localAberto === local}
                onClick={() =>
                  setLocalAberto((prev) => (prev === local ? null : local))
                }
                className="border rounded"
              >
                <summary className="cursor-pointer p-3 font-semibold bg-gray-100">
                  {local}
                </summary>

                {localAberto === local && (
                  <div className="p-3">
                    {Object.entries(variaveis).map(([variavel, anos]) => {
                      const idVariavel = `${local}-${variavel}`

                      return (
                        <details
                          key={idVariavel}
                          open={variavelAberta === idVariavel}
                          onClick={() =>
                            setVariavelAberta((prev) =>
                              prev === idVariavel ? null : idVariavel
                            )
                          }
                          className="mb-3"
                        >
                          <summary className="cursor-pointer font-medium bg-gray-50 border rounded p-2">
                            {variavel}
                          </summary>

                          {variavelAberta === idVariavel && (
                            <div className="pl-4 pt-2">
                              {Object.entries(anos).map(([ano, cnaes]) => {
                                const idAno = `${idVariavel}-${ano}`

                                return (
                                  <details
                                    key={idAno}
                                    open={graficoAberto === idAno}
                                    onClick={() =>
                                      setGraficoAberto((prev) =>
                                        prev === idAno ? null : idAno
                                      )
                                    }
                                    className="mb-2"
                                  >
                                    <summary className="cursor-pointer text-sm font-semibold bg-gray-100 px-2 py-1 rounded">
                                      Ano: {ano}
                                    </summary>

                                    {graficoAberto === idAno && (
                                      <>
                                        <ul className="list-disc list-inside text-sm text-gray-700 mt-2 ml-4">
                                          {Object.entries(cnaes).map(
                                            ([cnae, valor], idx) => (
                                              <li key={idx}>
                                                <span className="font-medium">
                                                  {cnae}:
                                                </span>{' '}
                                                {valor}
                                              </li>
                                            )
                                          )}
                                        </ul>

                                        <div className="h-64 mt-4">
                                          <Suspense fallback={<div>Carregando gráfico...</div>}>
                                            <BarChartLazy
                                              cnaes={cnaes}
                                              variavel={variavel}
                                            />
                                          </Suspense>
                                        </div>
                                      </>
                                    )}
                                  </details>
                                )
                              })}
                            </div>
                          )}
                        </details>
                      )
                    })}
                  </div>
                )}
              </details>
            </div>
          )
        })}
      </div>
    </div>
  )
}
