export const getPIAValues = async (
    variaveis: string = '630,1000810',
    periodo: string = 'last 1',
    nivelTerritorial = 'n1',
    classificacao = 'c12762/117897'
  ) => {
    const encodedPeriodo = encodeURIComponent(periodo)
    const primeiraVariavel = variaveis.split(',')[0]
    const encodedDetalhe = encodeURIComponent(`v${primeiraVariavel} 2`)
  
    const url = `https://apisidra.ibge.gov.br/values/t/1842/${nivelTerritorial}/all/v/${variaveis}/p/${encodedPeriodo}/${classificacao}/d/${encodedDetalhe}`
  
    const res = await fetch(url)
  
    if (!res.ok) {
      const erro = await res.text()
      throw new Error(`Erro na API SIDRA: ${erro}`)
    }
  
    const data = await res.json()
    return data
  }
  