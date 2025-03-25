'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Props {
  cnaes: Record<string, string>
  variavel: string
}

export default function BarChartWrapper({ cnaes, variavel }: Props) {
  const data = Object.entries(cnaes).map(([cnae, valor]) => ({
    cnae,
    valor: parseFloat(valor.replace(',', '.')) || 0,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="cnae" tick={{ fontSize: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="valor" fill="#3b82f6" name={variavel} />
      </BarChart>
    </ResponsiveContainer>
  )
}
