'use client'

import { useState } from 'react'

const variaveisDisponiveis = [
  { codigo: '1000630', nome: 'Número de empresas - percentual do total geral' },
  { codigo: '1000808', nome: 'Custos das operações industriais - percentual do total geral' },
  { codigo: '1000810', nome: 'Valor bruto da produção industrial - percentual do total geral' },
  { codigo: '1000811', nome: 'Valor da transformação industrial - percentual do total geral' },
  { codigo: '1000824', nome: 'Total da receita líquida de vendas - percentual do total geral' },
  { codigo: '1000825', nome: 'Consumo de matérias-primas - percentual do total geral' },
  { codigo: '1000826', nome: 'Energia elétrica consumida - percentual do total geral' },
  { codigo: '1000827', nome: 'Água consumida - percentual do total geral' },
  { codigo: '1000828', nome: 'Valor dos estoques finais - percentual do total geral' },
  { codigo: '1000829', nome: 'Despesas com pessoal - percentual do total geral' },
  { codigo: '1000830', nome: 'Valor adicionado bruto - percentual do total geral' },
  { codigo: '1000831', nome: 'Salários e retiradas - percentual do total geral' },
  { codigo: '1000832', nome: 'Pessoal ocupado total - percentual do total geral' },
  { codigo: '1000833', nome: 'Salário médio mensal - percentual do total geral' }
]

export default function FiltroVariaveisCheckbox({ onChange }: { onChange: (selecionadas: string[]) => void }) {
  const [selecionadas, setSelecionadas] = useState<string[]>([])

  const toggleCheckbox = (codigo: string) => {
    let atualizadas: string[] = []
    if (selecionadas.includes(codigo)) {
      atualizadas = selecionadas.filter(v => v !== codigo)
    } else {
      atualizadas = [...selecionadas, codigo]
    }
    setSelecionadas(atualizadas)
    onChange(atualizadas)
  }

  return (
    <div className="p-4 border rounded bg-white max-w-xl">
      <h2 className="text-lg font-semibold mb-4">Selecione as Variáveis</h2>
      <div className="flex flex-col gap-2 max-h-[400px] overflow-auto">
        {variaveisDisponiveis.map(variavel => (
          <label key={variavel.codigo} className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={selecionadas.includes(variavel.codigo)}
              onChange={() => toggleCheckbox(variavel.codigo)}
              className="mt-1"
            />
            <span className='text-black'>{variavel.nome}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
