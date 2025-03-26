import { useInfiniteQuery } from '@tanstack/react-query'

const PAGE_SIZE = 2000

const montarURL = (variaveis: string[], cnaes: string[], anos: string[], offset = 0) => {
  const base = 'https://apisidra.ibge.gov.br/values/t/1842/n1/all'
  const v = `v/${variaveis.join(',')}`
  const p = `p/${anos.join(',')}`
  const c = `c12762/${cnaes.join(',')}`
  const d = `d/v${variaveis[0]}%202`
  return `${base}/${v}/${p}/${c}/${d}?start=${offset}&limit=${PAGE_SIZE}`
}

type Filtros = {
  variaveis: string[]
  cnaes: string[]
  anos: string[]
}

export function useDadosIBGE(filtros: Filtros | null) {
  return useInfiniteQuery({
    queryKey: ['dados', filtros],
    queryFn: async ({ pageParam = 0 }) => {
      const url = montarURL(filtros!.variaveis, filtros!.cnaes, filtros!.anos, pageParam)
      const res = await fetch(url)
      const json = await res.json()
      return json.slice(1) // remove cabeçalho
    },
    initialPageParam: 0, // ✅ obrigatório no React Query 5+
    enabled: !!filtros,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < PAGE_SIZE ? undefined : allPages.length * PAGE_SIZE
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
  })
}